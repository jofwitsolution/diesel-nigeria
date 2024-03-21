"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import {
  sendReversalRejectedEmailToBuyer,
  sendReversalTransferEmailToBuyer,
} from "../helpers/mail";

const dieselngWalletId = process.env.DIESELNG_WALLET_ID;
if (!dieselngWalletId) {
  throw Error(`Environment variable "DIESELNG_WALLET_ID" is undefined`);
}

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
      where: { sellerId, category: "withdrawal" },
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
      where: { buyerId },
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

export const getAllReversals = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const reversals = await db.reversal.findMany({
      orderBy: { date: "desc" },
      include: {
        user: {
          select: {
            businessName: true,
            avatar: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    return { reversals };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSingleReversal = async (reversalId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const reversal = await db.reversal.findUnique({
      where: { id: reversalId },
      include: {
        user: {
          select: {
            businessName: true,
            avatar: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    const order = await db.order.findFirst({
      where: { orderNumber: reversal?.orderNumber },
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

    return { reversal, order };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const rejectReversal = async (reversalId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const reversal = await db.reversal.findUnique({
      where: { id: reversalId },
      include: {
        user: {
          select: {
            businessName: true,
            avatar: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
    if (!reversal) {
      return { error: "Reversal request not found!" };
    }

    if (reversal.status !== "pending") {
      return { error: "Action not allowed!" };
    }

    await db.reversal.update({
      where: { id: reversalId },
      data: { status: "failed" },
    });

    await sendReversalRejectedEmailToBuyer({
      email: reversal.user?.email,
      buyerName: reversal.user?.businessName,
      orderNumber: reversal.orderNumber,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const approveReversal = async (reversalId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const reversal = await db.reversal.findUnique({
      where: { id: reversalId },
      include: {
        user: {
          select: {
            businessName: true,
            avatar: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
    if (!reversal) {
      return { error: "reversal request not found!" };
    }

    if (reversal.status !== "pending") {
      return { error: "This action cannot be performed!" };
    }

    const dieselngWallet = await db.wallet.findUnique({
      where: { id: dieselngWalletId },
    });
    if (!dieselngWallet) {
      return { error: "No diesel wallet present" };
    }

    const newDieselngBalance = (
      Number(dieselngWallet.balance) - Number(reversal.amount)
    ).toString();
    await db.wallet.update({
      where: { id: dieselngWallet.id },
      data: { balance: newDieselngBalance },
    });

    await db.reversal.update({
      where: { id: reversal.id },
      data: { status: "successful" },
    });

    await db.order.update({
      where: { orderNumber: reversal.orderNumber },
      data: { status: "reversed" },
    });

    await db.transaction.create({
      data: {
        channel: "transfer",
        reference: `T${Date.now()}`,
        orderNumber: reversal.orderNumber,
        amount: reversal.amount,
        category: "reversal",
        buyerId: reversal.userId,
      },
    });

    await sendReversalTransferEmailToBuyer({
      email: reversal.user?.email!,
      businessName: reversal.user?.businessName!,
      amount: reversal.amount,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
