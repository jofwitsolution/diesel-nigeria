"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { exclude } from "@/prisma/pristma.utils";
import { db } from "../db";
import { BranchSchema, ResetPasswordSchema } from "../validations";
import { getCurrentUser } from "../helpers/auth";
import { getUserById } from "../helpers/user";
import { revalidatePath } from "next/cache";

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
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
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

export const addBranch = async (
  values: z.infer<typeof BranchSchema>,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = BranchSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { state, address, email, phoneNumber } = fields.data;

    await db.branch.create({
      data: {
        state,
        address,
        email,
        phoneNumber,
        userId: currentUser.id as string,
      },
    });

    revalidatePath(path);
    return { success: "Branch added successfuly" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getUserBranches = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const branches = await db.branch.findMany({
      where: { userId },
    });

    return { branches };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      select: {
        orderNumber: true,
        businessName: true,
        email: true,
        phoneNumber: true,
        deliveryLocation: true,
        quantity: true,
        expectedDeliveryDate: true,
        deliveryBranch: true,
        message: true,
        seller: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
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
        totalRate: true,
        serviceCharge: true,
        deliveryCharge: true,
        amount: true,
      },
    });

    return { order };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
