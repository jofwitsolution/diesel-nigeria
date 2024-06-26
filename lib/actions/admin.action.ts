"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewSellerSchema } from "../validations";
import { db } from "../db";
import {
  getUserByEmail,
  getUserById,
  getUserByPhoneNumber,
  getUserByRcNumber,
} from "../helpers/user";
import { generatePassword, getJanuary1stOfCurrentYear } from "../utils";
import { generateVerificationToken } from "../helpers/token";
import {
  sendDocumentRejectedEmail,
  sendDocumentVerifiedEmail,
  sendNewSellerEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendWithdrawalTransferEmail,
} from "../helpers/mail";
import { getCurrentUser } from "../helpers/auth";
import { revalidatePath } from "next/cache";
import { createNovuSubscriber } from "../helpers/novu";

const dieselngWalletId = process.env.DIESELNG_WALLET_ID;
if (!dieselngWalletId) {
  throw Error(`Environment variable "DIESELNG_WALLET_ID" is undefined`);
}

/*
 ** Create Seller
 */
export const addNewSeller = async (
  values: z.infer<typeof NewSellerSchema>,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const newSellerFields = NewSellerSchema.safeParse(values);

    if (!newSellerFields.success) {
      return { error: "Invalid fields." };
    }

    const { businessName, rcNumber, email, address, phoneNumber, state } =
      newSellerFields.data;

    const rcNumberExist = await getUserByRcNumber(rcNumber);
    if (rcNumberExist) {
      return { error: "Rc Number already in use!" };
    }
    const emailExist = await getUserByEmail(email);
    if (emailExist) {
      return { error: "Email already in use!" };
    }
    const phoneExist = await getUserByPhoneNumber(phoneNumber);
    if (phoneExist) {
      return { error: "Phone number already in use!" };
    }

    const password = generatePassword(12);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name: businessName,
        email,
        password: hashedPassword,
        businessName,
        rcNumber,
        address,
        phoneNumber,
        state,
        role: "seller",
      },
    });

    // Subscribe new user for in app notification
    await createNovuSubscriber(newUser);

    await db.wallet.create({
      data: {
        userId: newUser.id,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendWelcomeEmail(newUser.email, newUser.businessName!);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    await sendNewSellerEmail(email, password);

    revalidatePath(path);
    return { success: "Seller added successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

// Admin verify seller doc
export const verifySeller = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const seller = await getUserById(id);
    if (!seller || seller.role !== "seller") {
      return { error: "Seller does not exist!" };
    }

    await db.user.update({
      where: { id },
      data: {
        isVerifiedSeller: !seller.isVerifiedSeller,
      },
    });

    if (seller.isVerifiedSeller) {
      return { success: "Seller verification removed!" };
    }

    return { success: "Seller verification approved!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

// Admin verify buyer doc
export const verifyBuyer = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const buyer = await getUserById(id);
    if (!buyer || buyer.role !== "buyer") {
      return { error: "Buyer does not exist!" };
    }

    await db.user.update({
      where: { id },
      data: {
        isVerifiedBuyer: !buyer.isVerifiedBuyer,
      },
    });

    if (buyer.isVerifiedBuyer) {
      return { success: "Buyer verification removed!" };
    }

    return { success: "Buyer verification approved!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getAdminOverview = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const products = await db.product.findMany();

    const orders = await db.order.findMany();

    const totalBuyers = await db.user.count({ where: { role: "buyer" } });
    const totalSellers = await db.user.count({ where: { role: "seller" } });

    const completedOrders = orders.reduce((a, order) => {
      if (order.status === "delivered") {
        return a + 1;
      } else {
        return a;
      }
    }, 0);

    const pendingOrders = orders.reduce((a, order) => {
      if (order.status === "pending") {
        return a + 1;
      } else {
        return a;
      }
    }, 0);

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalBuyers,
      totalSellers,
      completedOrders,
      pendingOrders,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getAdminRevenue = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 1);

    const commisions = await db.transaction.findMany({
      where: {
        category: "commision",
        AND: [
          {
            date: {
              gte: startOfYear,
              lt: endOfYear,
            },
          },
        ],
      },
    });

    const reversals = await db.transaction.findMany({
      where: {
        category: "reversal",
        AND: [
          {
            date: {
              gte: startOfYear,
              lt: endOfYear,
            },
          },
        ],
      },
    });

    const totalCommision = commisions.reduce(
      (a, commision) => a + Number(commision.amount),
      0
    );
    const totalReversal = reversals.reduce(
      (a, reversal) => a + Number(reversal.amount),
      0
    );
    const totalRevenue = totalCommision - totalReversal;

    const startOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    // Calculate the start date of the current month
    const startOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Query commisions for the last month
    const lastMonthCommision = await db.transaction.findMany({
      where: {
        category: "commision",
        AND: [
          {
            date: {
              gte: startOfLastMonth,
              lt: startOfCurrentMonth,
            },
          },
        ],
      },
    });

    // Query reversals for the last month
    const lastMonthReversal = await db.transaction.findMany({
      where: {
        category: "reversal",
        AND: [
          {
            date: {
              gte: startOfLastMonth,
              lt: startOfCurrentMonth,
            },
          },
        ],
      },
    });

    const monthlyTotalCommision = lastMonthCommision.reduce(
      (a, commision) => a + Number(commision.amount),
      0
    );
    const monthlyTotalReversal = lastMonthReversal.reduce(
      (a, reversal) => a + Number(reversal.amount),
      0
    );
    const monthlyTotalRevenue = monthlyTotalCommision - monthlyTotalReversal;

    // Calculate the start date of the last week (7 days ago from today)
    const startDateOfLastWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );

    // Calculate the start date of today
    const startOfToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Query commisions for the last week
    const lastWeekCommision = await db.transaction.findMany({
      where: {
        category: "commision",
        AND: [
          {
            date: {
              gte: startDateOfLastWeek,
              lt: startOfToday,
            },
          },
        ],
      },
    });

    // Query reversal for the last week
    const lastWeekReversal = await db.transaction.findMany({
      where: {
        category: "reversal",
        AND: [
          {
            date: {
              gte: startDateOfLastWeek,
              lt: startOfToday,
            },
          },
        ],
      },
    });

    const weeklyTotalCommision = lastWeekCommision.reduce(
      (a, commision) => a + Number(commision.amount),
      0
    );
    const weeklyTotalReversal = lastWeekReversal.reduce(
      (a, reversal) => a + Number(reversal.amount),
      0
    );
    const weeklyTotalRevenue = weeklyTotalCommision - weeklyTotalReversal;

    // Calculate the start date of yesterday
    const startOfYesterday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    );

    // Query commisions for yesterday
    const yesterdayCommision = await db.transaction.findMany({
      where: {
        category: "commision",
        AND: [
          {
            date: {
              gte: startOfYesterday,
              lt: startOfToday,
            },
          },
        ],
      },
    });

    // Query reversal for yesterday
    const yesterdayReversal = await db.transaction.findMany({
      where: {
        category: "reversal",
        AND: [
          {
            date: {
              gte: startOfYesterday,
              lt: startOfToday,
            },
          },
        ],
      },
    });

    const yesterdayTotalCommision = yesterdayCommision.reduce(
      (a, commision) => a + Number(commision.amount),
      0
    );
    const yesterdayTotalReversal = yesterdayReversal.reduce(
      (a, reversal) => a + Number(reversal.amount),
      0
    );
    const yesterdayTotalRevenue =
      yesterdayTotalCommision - yesterdayTotalReversal;

    return {
      totalRevenue,
      monthlyTotalRevenue,
      weeklyTotalRevenue,
      yesterdayTotalRevenue,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getAllOrders = async (
  orderBy: string = "desc",
  take: null | number = null,
  selectedDate: null | Date = null
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const query = {
      orderBy: {
        orderDate: orderBy,
      },
      include: {
        seller: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
        buyer: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
        product: true,
      },
    };

    if (take !== null) {
      query.take = take;
    }

    if (selectedDate !== null) {
      // Calculate the start date
      const startDate = new Date(selectedDate);

      // calculate the next date
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      query.where.orderDate = { gte: startDate, lt: endDate };
    }

    const orders = await db.order.findMany(query);

    return { orders };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getAdminWalletData = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const dieselngWallet = await db.wallet.findUnique({
      where: { id: dieselngWalletId },
    });
    if (!dieselngWallet) {
      return { error: "No diesel wallet present" };
    }

    const transactions = await db.transaction.findMany();

    const totalPayment = transactions.reduce((a, transaction) => {
      if (transaction.category === "commision") {
        return a + Number(transaction.amount);
      } else {
        return a;
      }
    }, 0);

    const totalWithdrawal = transactions.reduce((a, transaction) => {
      if (transaction.category === "withdrawal") {
        return a + Number(transaction.amount);
      } else {
        return a;
      }
    }, 0);

    return {
      success: true,
      balance: dieselngWallet.balance,
      totalPayment,
      totalWithdrawal,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getAllTransactions = async (
  orderBy: string = "desc",
  take: null | number = null,
  targetDate: null | Date = null
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const query = {
      orderBy: {
        date: orderBy,
      },
      include: {
        user: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
      },
    };

    if (take !== null) {
      query.take = take;
    }

    if (targetDate !== null) {
      query.where.date = { gte: new Date(targetDate) };
    }

    const transactions = await db.transaction.findMany(query);

    return { success: true, transactions };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminGetTransactionOverview = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const january1stOfCurrentYear = getJanuary1stOfCurrentYear();

    const transactionsForYear = await db.transaction.findMany({
      where: {
        date: { gte: january1stOfCurrentYear },
      },
    });

    return { success: true, transactionsForYear };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminGetAllOrders = async (
  orderBy: string = "desc",
  take: null | number = null,
  selectedDate: null | Date = null
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const query = {
      orderBy: {
        orderDate: orderBy,
      },
      include: {
        seller: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
        buyer: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
        product: true,
      },
    };

    if (take !== null) {
      query.take = take;
    }

    if (selectedDate !== null) {
      // Calculate the start date
      const startDate = new Date(selectedDate);

      // calculate the next date
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      query.where.orderDate = { gte: startDate, lt: endDate };
    }

    const orders = await db.order.findMany(query);

    return { orders };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminGetUsersByRole = async (role: "seller" | "buyer") => {
  try {
    const users = await db.user.findMany({
      where: {
        role,
      },
      select: {
        avatar: true,
        businessName: true,
        state: true,
        rcNumber: true,
        id: true,
        address: true,
        phoneNumber: true,
        email: true,
        isSuspended: true,
      },
    });

    return { users };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminSuspendUser = async (
  userId: string,
  action: "suspend" | "activate",
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const outcome = action === "suspend";

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isSuspended: outcome,
      },
    });

    revalidatePath(path);
    if (outcome) {
      return { success: "Account suspended!" };
    } else {
      return { success: "Account activated!" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminDeleteUser = async (userId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    // check if user have a pending or order in progress
    const order = await db.order.findFirst({
      where: {
        AND: [
          { OR: [{ buyerId: userId }, { sellerId: userId }] },
          { OR: [{ status: "pending" }, { status: "progress" }] },
        ],
      },
    });
    if (order) {
      return { error: "You can't delete users with active Order" };
    }

    await db.user.delete({ where: { id: userId } });

    revalidatePath(path);
    return { success: "Account deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const approveSellerDocs = async (userId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerifiedSeller: true,
      },
    });

    await sendDocumentVerifiedEmail({
      email: user.email,
      businessName: user.businessName,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const approveBuyerDocs = async (userId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerifiedBuyer: true,
      },
    });

    await sendDocumentVerifiedEmail({
      email: user.email,
      businessName: user.businessName,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const rejectBusinessDocs = async (
  userId: string,
  description: string,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    if (!description) {
      return { error: "Please provide reason for rejection!" };
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { error: "User not found!" };
    }

    await sendDocumentRejectedEmail({
      email: user.email,
      businessName: user.businessName,
      description,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getAllWithdrawalRequests = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const withdrawalRequests = await db.withdrawalRequest.findMany({
      orderBy: { date: "desc" },
      include: {
        user: {
          select: {
            id: true,
            businessName: true,
            phoneNumber: true,
            email: true,
            accountName: true,
            bank: true,
            accountNumber: true,
          },
        },
      },
    });

    return { success: true, withdrawalRequests };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const confirmFundTransfer = async (
  withdrawalId: string,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const withdrawalRequest = await db.withdrawalRequest.findUnique({
      where: { id: withdrawalId },
    });
    if (!withdrawalRequest) {
      return { error: "Withdrawal request not found!" };
    }

    if (withdrawalRequest.status !== "pending") {
      return { error: "This action cannot be performed!" };
    }

    const dieselngWallet = await db.wallet.findUnique({
      where: { id: dieselngWalletId },
    });
    if (!dieselngWallet) {
      return { error: "No diesel wallet present" };
    }

    const sellerWallet = await db.wallet.findUnique({
      where: { userId: withdrawalRequest.userId as string },
    });
    if (!sellerWallet) {
      return { error: "Seller wallet not found!" };
    }

    const newSellerBalance =
      Number(sellerWallet.balance) - Number(withdrawalRequest.amount);
    await db.wallet.update({
      where: { userId: withdrawalRequest.userId as string },
      data: { balance: newSellerBalance },
    });

    const newDieselngBalance =
      Number(dieselngWallet.balance) - Number(withdrawalRequest.amount);
    await db.wallet.update({
      where: { id: dieselngWallet.id },
      data: { balance: newDieselngBalance },
    });

    await db.withdrawalRequest.update({
      where: { id: withdrawalRequest.id },
      data: { status: "successful" },
    });

    await db.transaction.create({
      data: {
        channel: "transfer",
        reference: `T${Date.now()}`,
        orderNumber: "",
        amount: withdrawalRequest.amount,
        category: "withdrawal",
        userId: withdrawalRequest.userId,
      },
    });

    const seller = await db.user.findUnique({
      where: { id: withdrawalRequest.userId as string },
    });
    await sendWithdrawalTransferEmail({
      email: seller?.email!,
      businessName: seller?.businessName!,
      amount: withdrawalRequest.amount,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const rejectWithdrawal = async (withdrawalId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const withdrawalRequest = await db.withdrawalRequest.findUnique({
      where: { id: withdrawalId },
    });
    if (!withdrawalRequest) {
      return { error: "Withdrawal request not found!" };
    }

    if (withdrawalRequest.status !== "pending") {
      return { error: "This action cannot be performed!" };
    }

    await db.withdrawalRequest.update({
      where: { id: withdrawalId },
      data: { status: "failed" },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminGetSellerOverview = async (sellerId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const products = await db.product.findMany({
      where: { sellerId },
    });

    const orders = await db.order.findMany({
      where: { sellerId },
    });

    const transactions = await db.transaction.findMany({
      where: { userId: sellerId, category: "withdrawal" },
    });

    const totalLitres = products.reduce(
      (a, product) => a + Number(product.numberInStock),
      0
    );

    const completedOrders = orders.reduce((a, order) => {
      if (order.status === "delivered") {
        return a + 1;
      } else {
        return a;
      }
    }, 0);

    const pendingOrders = orders.reduce((a, order) => {
      if (order.status === "pending") {
        return a + 1;
      } else {
        return a;
      }
    }, 0);

    const transactionsAmount = transactions.reduce(
      (a, transaction) => a + Number(transaction.amount),
      0
    );

    const priceAlert = products[0] ? products[0].price : 0;

    return {
      priceAlert: Number(priceAlert),
      totalProducts: products.length,
      totalOrders: orders.length,
      totalLitres,
      transactionsAmount,
      totalTransactions: transactions.length,
      completedOrders,
      pendingOrders,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const adminGetBuyerOverview = async (buyerId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const branches = await db.branch.findMany({
      where: { userId: buyerId },
    });

    const orders = await db.order.findMany({
      where: { buyerId },
    });

    const transactions = await db.transaction.findMany({
      where: { userId: buyerId },
    });

    const completedOrders = orders.reduce((a, order) => {
      if (order.status === "delivered") {
        return a + 1;
      } else {
        return a;
      }
    }, 0);

    const pendingOrders = orders.reduce((a, order) => {
      if (order.status === "pending") {
        return a + 1;
      } else {
        return a;
      }
    }, 0);

    const transactionsAmount = transactions.reduce(
      (a, transaction) => a + Number(transaction.amount),
      0
    );

    return {
      totalBranches: branches.length,
      totalOrders: orders.length,
      transactionsAmount,
      totalTransactions: transactions.length,
      completedOrders,
      pendingOrders,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
