"use server";

import * as z from "zod";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import { PlaceOrderSchema } from "../validations";
import { generateOrderNumber } from "../helpers/order";

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
    });

    return { orderId: order.id, success: "Order created successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const verifyOrderPayment = async (reference: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }
    console.log(reference);

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
    });
    if (!order) {
      return { error: `Invalid Order Payment` };
    }

    console.log(Number(order.amount), Number(data.amount));
    if (Number(order.amount) !== Number(data.amount) / 100) {
      return { error: `Payment cannot be less than the expected amount` };
    }

    if (order.isBuyerPaid) {
      return { error: `Buyer already paid for this order.` };
    }

    // await db.order.update({
    //   where: { id: order.id },
    //   data: {
    //     isBuyerPaid: true,
    //     status: "progress",
    //     channel: data?.channel,
    //   },
    // });

    // await db.transaction.create({
    //   data: {
    //     channel: data.channel,
    //     reference: data.reference,
    //     orderNumber: order.orderNumber,
    //     amount: data.amount,
    //     category: "commision",
    //     buyerId: order.buyerId,
    //     sellerId: order.sellerId,
    //   },
    // });

    return { success: "Payment made successfully", orderId: order.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
