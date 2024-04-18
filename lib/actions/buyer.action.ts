"use server";

import * as z from "zod";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import {
  BuyerBusinessInfoSchema,
  BuyerVerificationDocSchema,
} from "../validations";
import { countUniqueSellers } from "../helpers/order";
import { revalidatePath } from "next/cache";
import { cloudinary } from "../helpers/cloudinary";
import { updateNovuSubscriber } from "../helpers/novu";
import { getUserByRcNumber } from "../helpers/user";

const dieselngWalletId = process.env.DIESELNG_WALLET_ID;
if (!dieselngWalletId) {
  throw Error(`Environment variable "DIESELNG_WALLET_ID" is undefined`);
}

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
    const amountSpent = orders.reduce((a, order) => a + order.amount, 0);
    const branchServiced = countUniqueSellers(orders);

    return { volumes, amountSpent, branchServiced };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const buyerUpdateBusinessInfo = async (
  values: z.infer<typeof BuyerBusinessInfoSchema>,
  imageData: string | ArrayBuffer | null,
  path: string
) => {
  try {
    const fields = BuyerBusinessInfoSchema.safeParse(values);

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

export const buyerUploadVerificationDoc = async (
  values: z.infer<typeof BuyerVerificationDocSchema>,
  doc: string | ArrayBuffer | null,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = BuyerVerificationDocSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { rcNumber } = fields.data;

    const rcNumberExist = await getUserByRcNumber(rcNumber!);
    if (rcNumberExist) {
      return { error: "Rc Number already in use!" };
    }

    const user = await db.user.update({
      where: { id: currentUser?.id },
      data: {
        rcNumber,
      },
      include: {
        document: true,
      },
    });

    if (doc) {
      const publicId: string = user?.document
        ? user.document.public_id.split("/")[1]
        : `doc-${Date.now()}`;
      //   const publicId: string = `img-${Date.now()}`;

      const result = await cloudinary.uploader.upload(doc as string, {
        // resource_type: "raw",
        folder: "documents",
        public_id: publicId,
      });

      await db.document.upsert({
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
