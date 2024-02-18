"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { BankDetailsSchema, SellerBusinessInfoSchema } from "../validations";
import { getCurrentUser } from "../helpers/auth";
import { cloudinary } from "../helpers/cloudinary";
import { db } from "../db";

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
