"use server";

import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";

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
