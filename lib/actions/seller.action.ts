"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import {
  BankDetailsSchema,
  ProductSchema,
  SellerBusinessInfoSchema,
} from "../validations";
import { getCurrentUser } from "../helpers/auth";
import { cloudinary } from "../helpers/cloudinary";
import { db } from "../db";
import {
  sendOrderDeliveredEmailToAdmin,
  sendOrderDeliveredEmailToBuyer,
  sendOrderInProgressEmailToBuyer,
} from "../helpers/mail";
import { countUniqueBuyers } from "../helpers/order";

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

export const addNewProduct = async (
  values: z.infer<typeof ProductSchema>,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = ProductSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { isAvailable, price, density, numberInStock } = fields.data;

    await db.product.create({
      data: {
        isAvailable,
        price,
        density,
        numberInStock,
        sellerId: currentUser.id as string,
      },
    });

    revalidatePath(path);
    return { success: "Product added successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const updateProduct = async (
  values: z.infer<typeof ProductSchema>,
  productId: string,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = ProductSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { isAvailable, price, density, numberInStock } = fields.data;

    await db.product.update({
      where: { id: productId },
      data: {
        isAvailable,
        price,
        density,
        numberInStock,
      },
    });

    revalidatePath(path);
    return { success: "Product added successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSellerProducts = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const products = await db.product.findMany({
      where: { sellerId: currentUser?.id },
    });

    return { products };
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
    const sales = orders.reduce((a, order) => a + parseFloat(order.amount), 0);
    const buyersServiced = countUniqueBuyers(orders);

    return { volumes, sales, buyersServiced };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
