"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import { ProductSchema } from "../validations";

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
