"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import { BranchSchema, BranchUpdateSchema } from "../validations";

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

    const { name, state, address, email, phoneNumber } = fields.data;
    const branchExist = await db.branch.findUnique({ where: { name } });
    if (branchExist) {
      return { error: "Branch name exist!" };
    }

    await db.branch.create({
      data: {
        name,
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

export const updateBranch = async (
  values: z.infer<typeof BranchUpdateSchema>,
  branchId: string,
  path: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const fields = BranchUpdateSchema.safeParse(values);

    if (!fields.success) {
      return { error: "Invalid fields." };
    }

    const { state, address, email, phoneNumber } = fields.data;

    await db.branch.update({
      where: { id: branchId },
      data: {
        state,
        address,
        email,
        phoneNumber,
      },
    });

    revalidatePath(path);
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
