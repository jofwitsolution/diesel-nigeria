"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import {
  BankDetailsSchema,
  SellerBusinessInfoSchema,
  WithdrawalSchema,
} from "../validations";
import { getCurrentUser } from "../helpers/auth";
import { cloudinary } from "../helpers/cloudinary";
import { db } from "../db";
import { sendWithdrawalRequestEmailToAdmin } from "../helpers/mail";
import { countUniqueBuyers } from "../helpers/order";
import { formatPrice, getJanuary1stOfCurrentYear } from "../utils";
import { getUserById } from "../helpers/user";
import { triggerNovu, updateNovuSubscriber } from "../helpers/novu";

export const sellerUpdateBusinessInfo = async (
  values: z.infer<typeof SellerBusinessInfoSchema>,
  imageData: string | ArrayBuffer | null,
  path: string
) => {
  try {
    const fields = SellerBusinessInfoSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { address, businessDescription } = fields.data;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await db.user.findUnique({
      where: { id: currentUser?.id },
      include: {
        avatar: true,
      },
    });

    if (imageData) {
      const publicId: string = user?.avatar
        ? user.avatar.public_id.split("/")[1]
        : `img-${Date.now()}`;
      //   const publicId: string = `img-${Date.now()}`;

      const result = await cloudinary.uploader.upload(imageData as string, {
        // resource_type: "raw",
        folder: "logo",
        public_id: publicId,
      });

      await db.avatar.upsert({
        where: { userId: user?.id },
        update: {
          url: result.url,
          public_id: result.public_id,
        },
        create: {
          url: result.url,
          public_id: result.public_id,
          userId: user?.id,
        },
      });
    }

    await db.user.update({
      where: { id: user?.id },
      data: {
        address,
        businessDescription,
      },
    });

    await updateNovuSubscriber(user!);

    revalidatePath(path);
    return { success: "Changes saved successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const sellerUploadVerificationDocs = async (
  incCertData: string | ArrayBuffer | null,
  cacData: string | ArrayBuffer | null,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await db.user.findUnique({
      where: { id: currentUser?.id },
      include: {
        incorporationCertificate: true,
        CACForm: true,
      },
    });

    if (incCertData) {
      const publicId: string = user?.incorporationCertificate
        ? user.incorporationCertificate.public_id.split("/")[1]
        : `doc-${Date.now()}`;
      //   const publicId: string = `img-${Date.now()}`;

      const result = await cloudinary.uploader.upload(incCertData as string, {
        // resource_type: "raw",
        folder: "documents",
        public_id: publicId,
      });

      await db.incorporationCertificate.upsert({
        where: { userId: user?.id },
        update: {
          url: result.url,
          public_id: result.public_id,
        },
        create: {
          url: result.url,
          public_id: result.public_id,
          userId: user?.id,
        },
      });
    }

    if (cacData) {
      const publicId: string = user?.CACForm
        ? user.CACForm.public_id.split("/")[1]
        : `doc-${Date.now()}`;
      //   const publicId: string = `img-${Date.now()}`;

      const result = await cloudinary.uploader.upload(incCertData as string, {
        // resource_type: "raw",
        folder: "documents",
        public_id: publicId,
      });

      await db.cACForm.upsert({
        where: { userId: user?.id },
        update: {
          url: result.url,
          public_id: result.public_id,
        },
        create: {
          url: result.url,
          public_id: result.public_id,
          userId: user?.id,
        },
      });
    }

    revalidatePath(path);
    return { success: "Document uploaded successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const sellerUpdateBankDetails = async (
  values: z.infer<typeof BankDetailsSchema>,
  path: string
) => {
  try {
    const fields = BankDetailsSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { accountNumber, bank, accountName } = fields.data;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    await db.user.update({
      where: { id: currentUser?.id },
      data: {
        accountNumber,
        bank,
        accountName,
      },
    });

    revalidatePath(path);
    return { success: "Changes saved successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSellerOverview = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const products = await db.product.findMany({
      where: { sellerId: currentUser.id },
    });

    const orders = await db.order.findMany({
      where: { sellerId: currentUser.id },
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

    const priceAlert = products[0] ? products[0].price : 0;

    return {
      priceAlert,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalLitres,
      completedOrders,
      pendingOrders,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSalesAnalytics = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const orders = await db.order.findMany({
      where: { sellerId: currentUser.id, status: "delivered" },
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
          },
        },
        product: true,
        deliveryBranch: true,
      },
    });

    const volumes = orders.reduce((a, order) => a + Number(order.quantity), 0);
    const sales = orders.reduce((a, order) => a + order.sellerSettlement, 0);
    const buyersServiced = countUniqueBuyers(orders);

    return { volumes, sales, buyersServiced };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSellerWalletData = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await getUserById(currentUser.id);
    const wallet = await db.wallet.findUnique({
      where: { userId: currentUser.id },
    });
    const transactions = await db.transaction.findMany({
      where: { userId: currentUser.id },
    });

    const totalPayment = transactions.reduce((a, transaction) => {
      if (transaction.category === "settlement") {
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
      balance: wallet?.balance,
      totalPayment,
      totalWithdrawal,
      accountNumber: user?.accountNumber as string,
      bank: user?.bank as string,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getPaymentOverview = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const january1stOfCurrentYear = getJanuary1stOfCurrentYear();

    const payments = await db.transaction.findMany({
      where: {
        userId: currentUser.id,
        category: "settlement",
        date: { gte: january1stOfCurrentYear },
      },
    });

    return { success: true, payments };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSellerWithdrawals = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const withdrawals = await db.withdrawalRequest.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    console.log(withdrawals);

    return { success: true, withdrawals };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const sellerWithdrawFunds = async (
  values: z.infer<typeof WithdrawalSchema>,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = WithdrawalSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { amount, accountNumber, description, bank } = fields.data;

    if (Number(amount) < 20000) {
      return {
        error: "Minimum withdrawal is 20,000",
      };
    }

    const wallet = await db.wallet.findUnique({
      where: { userId: currentUser.id },
      include: {
        user: true,
      },
    });
    if (!wallet) {
      return { error: "No wallet found!" };
    }

    if (Number(wallet.balance) < Number(amount)) {
      return { error: "Insufficient balance" };
    }

    const withdrawal = await db.withdrawalRequest.findFirst({
      where: {
        userId: currentUser.id,
        status: "pending",
      },
    });
    if (withdrawal) {
      return { error: "You have a pending withdrawal" };
    }

    await db.withdrawalRequest.create({
      data: {
        amount,
        accountNumber,
        bank,
        description,
        channel: "transfer",
        reference: `W${Date.now()}`,
        userId: currentUser.id,
      },
    });

    const businessName = wallet.user?.businessName!;
    // send email to admin
    await sendWithdrawalRequestEmailToAdmin({
      businessName,
      amount,
    });
    const admin = await db.user.findFirst({ where: { role: "admin" } });
    if (admin) {
      await triggerNovu(admin.id, "new-withdrawal-request", {
        businessName,
        amount: formatPrice(Number(amount)),
      });
    }

    revalidatePath(path);
    return { success: "Withdrawal submitted successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
