"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { exclude } from "@/prisma/pristma.utils";
import { db } from "../db";
import { ResetPasswordSchema } from "../validations";
import { getCurrentUser } from "../helpers/auth";
import { getUserById } from "../helpers/user";

export const getUser = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        wallet: true,
        avatar: true,
        document: true,
        CACForm: true,
        incorporationCertificate: true,
      },
    });

    const userWithoutPassword = exclude(user, ["password"]);

    return { user: userWithoutPassword };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  try {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await getUserById(currentUser.id);

    const { currentPassword, newPassword } = validatedFields.data;
    const isPasswordsMatch = await bcrypt.compare(
      currentPassword,
      user?.password!
    );
    if (!isPasswordsMatch) {
      return { error: "Invalid current password" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: user?.id! },
      data: { password: hashedPassword },
    });

    return { success: "Password reset successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getVerifiedSellers = async () => {
  try {
    const sellers = await db.user.findMany({
      where: {
        role: "seller",
        isVerifiedSeller: true,
        emailVerified: { not: null },
        // products: { some: {} }, // Check if the products array has at least one item
      },
      select: {
        avatar: true,
        businessName: true,
        state: true,
        products: true,
        id: true,
      },
    });

    return { sellers };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getSellerDetails = async (sellerId: string) => {
  try {
    const seller = await db.user.findUnique({
      where: {
        id: sellerId,
        isVerifiedSeller: true,
      },
      select: {
        avatar: true,
        businessName: true,
        state: true,
        products: true,
        id: true,
        rcNumber: true,
        address: true,
        businessDescription: true,
      },
    });

    return { seller };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
