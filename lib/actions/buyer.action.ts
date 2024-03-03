"use server";

import * as z from "zod";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import { PlaceOrderSchema } from "../validations";
import { countUniqueSellers, generateOrderNumber } from "../helpers/order";
import {
  sendOrderCreatedEmailToAdmin,
  sendOrderCreatedEmailToBuyer,
  sendOrderCreatedEmailToSeller,
  sendOrderPaymentEmailToAdmin,
  sendOrderPaymentEmailToBuyer,
  sendOrderPaymentEmailToSeller,
} from "../helpers/mail";

export const getPlaceOrderData = async (sellerId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const buyerData = await db.user.findUnique({
      where: { id: currentUser.id as string },
      select: {
        businessName: true,
        phoneNumber: true,
        email: true,
        id: true,
        branches: true,
      },
    });

    const sellerData = await db.user.findUnique({
      where: { id: sellerId },
      select: {
        products: true,
        id: true,
        businessName: true,
        avatar: true,
      },
    });

    return { buyerData, sellerData };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const createOrder = async (
  sellerId: string,
  values: z.infer<typeof PlaceOrderSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = PlaceOrderSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields!" };
    }

    const {
      businessName,
      email,
      phoneNumber,
      deliveryLocation,
      branch,
      deliveryDate,
      product: productId,
      quantity,
      message,
    } = fields.data;

    const product = await db.product.findUnique({ where: { id: productId } });
    if (product) {
      if (Number(quantity) > Number(product.numberInStock)) {
        return { error: "Your order exceeds available diesel" };
      }
    } else {
      return { error: "Invalid diesel density!" };
    }

    if (product.sellerId !== sellerId) {
      return { error: "Product mismatch. Invalid seller!" };
    }

    // Generate the order number
    const orderNumber = await generateOrderNumber();
    const totalRate = Number(product.price) * Number(quantity); // price per litre * number of litres
    const serviceCharge = 5000;
    const deliveryCharge = 100000;
    const amount = totalRate + serviceCharge + deliveryCharge;

    const order = await db.order.create({
      data: {
        orderNumber,
        businessName,
        email,
        phoneNumber,
        deliveryLocation,
        quantity,
        expectedDeliveryDate: deliveryDate,
        deliveryBranchId: branch,
        message,
        sellerId,
        buyerId: currentUser.id as string,
        productId,
        totalRate: totalRate.toString(),
        serviceCharge: serviceCharge.toString(),
        deliveryCharge: deliveryCharge.toString(),
        amount: amount.toString(),
      },
      include: {
        seller: {
          select: {
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
            email: true,
          },
        },
      },
    });

    await db.orderTracking.create({
      data: {
        orderId: order.id,
      },
    });

    await sendOrderCreatedEmailToBuyer({
      email: order.email,
      amount: order.amount,
      orderNumber: order.orderNumber,
      businessName: order.businessName,
    });
    await sendOrderCreatedEmailToSeller({
      email: order.seller.email,
      orderNumber: order.orderNumber,
      deliveryLocation: order.deliveryLocation,
      quantity: order.quantity,
      businessName: order.businessName,
    });
    await sendOrderCreatedEmailToAdmin({
      orderNumber: order.orderNumber,
      quantity: order.quantity,
      businessName: order.businessName,
    });

    return { orderId: order.id, success: "Order created successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const verifyOrderPayment = async (reference: string) => {
  const dieselngWalletId = process.env.DIESELNG_WALLET_ID;
  if (!dieselngWalletId) {
    return { error: "No diesel wallet id present" };
  }

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const verifRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        },
      }
    );

    const { data } = await verifRes.json();
    console.log(data);
    if (data?.status !== "success") {
      return { error: `Payment unsuccessful` };
    }

    if (data?.metadata?.userId !== currentUser.id) {
      return { error: `Invalid Payment` };
    }

    const order = await db.order.findUnique({
      where: { id: data?.metadata.orderId, buyerId: data?.metadata.userId },
      include: {
        seller: {
          select: {
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
            email: true,
          },
        },
      },
    });
    if (!order) {
      return { error: `Invalid Order Payment` };
    }

    // data.amount is divided by 100 to convert from paystack amount to normal amount
    if (Number(order.amount) !== Number(data.amount) / 100) {
      return { error: `Payment cannot be less than the expected amount` };
    }

    if (order.isBuyerPaid) {
      return { error: `Buyer already paid for this order.` };
    }

    await db.order.update({
      where: { id: order.id },
      data: {
        isBuyerPaid: true,
        // status: "progress", seller should put under in progress after payment and order is ready for delivery
        channel: data?.channel,
      },
    });

    await db.transaction.create({
      data: {
        channel: data.channel,
        reference: data.reference,
        orderNumber: order.orderNumber,
        amount: order.amount,
        category: "commision",
        buyerId: order.buyerId,
        sellerId: order.sellerId,
      },
    });

    const dieselngWallet = await db.wallet.findUnique({
      where: { id: dieselngWalletId },
    });
    if (!dieselngWallet) {
      return { error: "No diesel wallet present" };
    }

    // Convert balance to number and add the amount
    const updatedBalance = (
      parseFloat(dieselngWallet.balance) + parseFloat(data.amount)
    ).toString();

    await db.wallet.update({
      where: { id: dieselngWalletId },
      data: {
        balance: updatedBalance,
      },
    });

    await sendOrderPaymentEmailToBuyer({
      email: order.email,
      amount: order.amount,
      businessName: order.businessName,
      reference: data.reference,
    });
    await sendOrderPaymentEmailToSeller({
      email: order.seller.email,
      orderNumber: order.orderNumber,
      deliveryLocation: order.deliveryLocation,
      quantity: order.quantity,
      businessName: order.businessName,
    });
    await sendOrderPaymentEmailToAdmin({
      orderNumber: order.orderNumber,
      quantity: order.quantity,
      businessName: order.businessName,
    });

    return { success: "Payment made successfully", orderId: order.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getPurchaseAnalytics = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const orders = await db.order.findMany({
      where: { buyerId: currentUser.id, status: "delivered" },
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
    const amountSpent = orders.reduce(
      (a, order) => a + parseFloat(order.amount),
      0
    );
    const branchServiced = countUniqueSellers(orders);

    return { volumes, amountSpent, branchServiced };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
