"use server";

import * as z from "zod";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import {
  sendOrderCancelledEmailToBuyer,
  sendOrderCancelledEmailToSeller,
  sendOrderCreatedEmailToAdmin,
  sendOrderCreatedEmailToBuyer,
  sendOrderCreatedEmailToSeller,
  sendOrderDeliveredEmailToAdmin,
  sendOrderDeliveredEmailToBuyer,
  sendOrderInProgressEmailToBuyer,
  sendOrderPaymentEmailToAdmin,
  sendOrderPaymentEmailToBuyer,
  sendOrderPaymentEmailToSeller,
} from "../helpers/mail";
import { triggerNovu } from "../helpers/novu";
import { calculateOrderCost, generateOrderNumber } from "../helpers/order";
import { formatPrice } from "../utils";
import { PlaceOrderSchema } from "../validations";
import { revalidatePath } from "next/cache";

const dieselngWalletId = process.env.DIESELNG_WALLET_ID;
if (!dieselngWalletId) {
  throw Error(`Environment variable "DIESELNG_WALLET_ID" is undefined`);
}

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

    const seller = await db.user.findUnique({
      where: { id: sellerId, role: "seller" },
    });
    if (!seller || seller.isSuspended || !seller.isVerifiedSeller) {
      return { error: "Invalid Seller!" };
    }

    if (Number(quantity) < 1000) {
      return { error: "Minimum order is 1000 litres" };
    }
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

    // Calculate order cost
    const { amount, totalRate, deliveryCharge, serviceCharge } =
      calculateOrderCost(product.price, quantity);

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
        totalRate,
        serviceCharge,
        deliveryCharge,
        amount,
        pricePerLitre: product.price,
        densityValue: product.density,
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

    await triggerNovu(order.buyerId, "you-placed-an-order", {
      businessName,
      orderNumber,
      amount: formatPrice(amount),
    });
    await triggerNovu(order.sellerId, "you-have-an-order", {
      businessName,
      orderNumber,
      quantity,
      deliveryLocation,
    });

    return { orderId: order.id, success: "Order created successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const validateOrder = async (orderId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

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
      return { error: "Order doesn't exist!" };
    }

    // Exit if buyer has paid or buyer doesn't own the order or order is not a pending order
    if (
      order.buyerId !== currentUser.id ||
      order.status !== "pending" ||
      order.isBuyerPaid
    ) {
      return { error: "Action not allowed!" };
    }

    const product = await db.product.findUnique({
      where: { id: order.productId },
    });
    if (!product) {
      return { error: "Product not found!" };
    }

    // if Product price has not change
    if (product.price === order.pricePerLitre) {
      return { isPriceChange: false };
    } else {
      // Product price has changed: recalculate order cost
      const { amount, totalRate, deliveryCharge, serviceCharge } =
        calculateOrderCost(product.price, order.quantity);

      await db.order.update({
        where: { id: order.id },
        data: {
          pricePerLitre: product.price,
          amount,
          totalRate,
          deliveryCharge,
          serviceCharge,
        },
      });

      revalidatePath(path);
      return { isPriceChange: true };
    }
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
    // console.log(data);
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
    const amountPaid = Number(data.amount) / 100;

    if (Number(order.amount) !== amountPaid) {
      return { error: `Payment cannot be less than the expected amount` };
    }

    if (order.isBuyerPaid) {
      return { error: `Buyer already paid for this order.` };
    }

    await db.order.update({
      where: { id: order.id },
      data: {
        paidOn: new Date(),
        isBuyerPaid: true,
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
        userId: order.buyerId,
        deliveryBranchId: order.deliveryBranchId,
      },
    });

    const dieselngWallet = await db.wallet.findUnique({
      where: { id: dieselngWalletId },
    });
    if (!dieselngWallet) {
      return { error: "No diesel wallet present" };
    }

    // Convert balance to number and add the amount
    const updatedBalance = dieselngWallet.balance + amountPaid;

    await db.wallet.update({
      where: { id: dieselngWalletId },
      data: {
        balance: updatedBalance,
      },
    });

    await sendOrderPaymentEmailToBuyer({
      email: order.email,
      amount: order.amount!,
      businessName: order.businessName,
      reference: data.reference,
    });
    await sendOrderPaymentEmailToSeller({
      email: order.seller.email,
      orderNumber: order.orderNumber,
      deliveryLocation: order.deliveryLocation,
      quantity: order.quantity!,
      businessName: order.businessName,
    });
    await sendOrderPaymentEmailToAdmin({
      orderNumber: order.orderNumber,
      quantity: order.quantity!,
      businessName: order.businessName,
    });

    return { success: "Payment made successfully", orderId: order.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const sellerUpdateOrderStatus = async (
  orderId: string,
  status: string,
  pathname: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const order = await db.order.findUnique({
      where: { sellerId: currentUser?.id, id: orderId },
    });
    if (!order) {
      return { error: "Order not found" };
    }

    if (
      !order.isBuyerPaid ||
      order.status === "delivered" ||
      order.status === "cancelled"
    ) {
      return { error: "This action cannot be performed" };
    }

    await db.order.update({
      where: { sellerId: currentUser?.id, id: orderId },
      data: {
        status,
      },
    });

    // await db.orderTracking.update({
    //   where: { orderId },
    //   data: {
    //     [status]: true,
    //   },
    // });

    if (status === "progress") {
      await sendOrderInProgressEmailToBuyer({
        orderNumber: order.orderNumber,
        email: order.email,
        businessName: order.businessName,
      });
    }

    if (status === "delivered") {
      await sendOrderDeliveredEmailToBuyer({
        orderNumber: order.orderNumber,
        email: order.email,
        businessName: order.businessName,
      });
      await sendOrderDeliveredEmailToAdmin({
        orderNumber: order.orderNumber,
        businessName: order.businessName,
      });
    }

    revalidatePath(pathname);
    return { success: "Order updated successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const buyerConfirmOrderDelivery = async (
  orderId: string,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return { error: "Order doesn't exist!" };
    }

    if (order.buyerId !== currentUser.id || order.isdeliveryConfirmed) {
      return { error: "Action not allowed!" };
    }

    // get seller wallet
    const sellerWallet = await db.wallet.findUnique({
      where: { userId: order.sellerId },
    });
    if (!sellerWallet) {
      return { error: "Problem finding seller wallet!" };
    }

    await db.order.update({
      where: { id: orderId },
      data: { isdeliveryConfirmed: true },
    });

    const totalRate = Number(order.totalRate);
    const sellerCredit = totalRate - totalRate * (0.5 / 100); // total rate minus 0.5% of the total rate
    const newSellerBalance = Number(sellerWallet.balance) + sellerCredit;

    await db.wallet.update({
      where: { userId: order.sellerId },
      data: {
        balance: newSellerBalance,
      },
    });

    await db.transaction.create({
      data: {
        channel: "dieselng",
        reference: `T${Date.now()}`,
        orderNumber: order.orderNumber,
        amount: sellerCredit,
        category: "settlement",
        userId: order.sellerId,
      },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const cancelOrder = async (orderId: string, path: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

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
      return { error: "Order doesn't exist!" };
    }

    // Exit if buyer has paid or buyer doesn't own the order or order is not a pending order
    if (
      order.buyerId !== currentUser.id ||
      order.status !== "pending" ||
      order.isBuyerPaid
    ) {
      return { error: "Action not allowed!" };
    }

    await db.order.update({
      where: { id: orderId },
      data: { status: "cancelled" },
    });

    await sendOrderCancelledEmailToBuyer({
      email: order.buyer.email,
      buyerName: order.buyer.businessName,
      orderNumber: order.orderNumber,
    });

    await sendOrderCancelledEmailToSeller({
      email: order.seller.email,
      buyerName: order.seller.businessName,
      orderNumber: order.orderNumber,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
