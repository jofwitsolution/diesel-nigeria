"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import {
  sendReversalRejectedEmailToBuyer,
  sendReversalReqEmailToAdmin,
  sendReversalReqEmailToBuyer,
  sendReversalReqEmailToSeller,
  sendReversalTransferEmailToBuyer,
} from "../helpers/mail";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import { RequestReversalSchema } from "../validations";

const dieselngWalletId = process.env.DIESELNG_WALLET_ID;
if (!dieselngWalletId) {
  throw Error(`Environment variable "DIESELNG_WALLET_ID" is undefined`);
}

export const requestForReversal = async (
  values: z.infer<typeof RequestReversalSchema>,
  orderId: string,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = RequestReversalSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { accountName, accountNumber, bank, reason, description } =
      fields.data;

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: {
          select: {
            businessName: true,
            email: true,
          },
        },
        seller: {
          select: {
            businessName: true,
            email: true,
          },
        },
      },
    });
    if (!order) {
      return { error: "Invalid order!" };
    }

    // If it's not a paid order or order status is not pending or order doesn't belong to current user
    if (
      !order.isBuyerPaid ||
      order.status !== "pending" ||
      order.buyerId !== currentUser.id
    ) {
      return { error: "Action not allowed!" };
    }

    const existingReversal = await db.reversal.findFirst({
      where: { userId: currentUser.id, status: "pending" },
    });
    if (existingReversal) {
      return { error: "You have a pending reversal request!" };
    }

    await db.reversal.create({
      data: {
        orderNumber: order.orderNumber,
        amount: order.amount,
        userId: currentUser.id,
        channel: "transfer",
        reference: `R${Date.now()}`,
        reason,
        description,
        bank,
        accountName,
        accountNumber,
      },
    });

    await sendReversalReqEmailToBuyer({
      email: order.buyer.email,
      businessName: order.buyer.businessName,
      orderNumber: order.orderNumber,
    });

    await sendReversalReqEmailToSeller({
      email: order.seller.email,
      sellerName: order.seller.businessName,
      buyerName: order.buyer.businessName,
      orderNumber: order.orderNumber,
    });

    await sendReversalReqEmailToAdmin({
      buyerName: order.buyer.businessName,
      orderNumber: order.orderNumber,
    });

    revalidatePath(path);
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

    const newDieselngBalance =
      Number(dieselngWallet.balance) - Number(reversal.amount);
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
        userId: reversal.userId,
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
