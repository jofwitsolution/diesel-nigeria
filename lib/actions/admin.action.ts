"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewSellerSchema } from "../validations";
import { db } from "../db";
import { getUserByEmail, getUserById } from "../helpers/user";
import { generatePassword } from "../utils";
import { generateVerificationToken } from "../helpers/token";
import { sendNewSellerEmail, sendVerificationEmail } from "../helpers/mail";

export const addNewSeller = async (values: z.infer<typeof NewSellerSchema>) => {
  try {
    const newSellerFields = NewSellerSchema.safeParse(values);

    if (!newSellerFields.success) {
      return { error: "Invalid fields." };
    }

    const { businessName, rcNumber, email, address, phoneNumber } =
      newSellerFields.data;

    const emailExist = await getUserByEmail(email);
    if (emailExist) {
      return { error: "Email already in use!" };
    }
    const rcNumberExist = await getUserByEmail(rcNumber);
    if (rcNumberExist) {
      return { error: "Rc Number already in use!" };
    }
    const phoneExist = await getUserByEmail(phoneNumber);
    if (phoneExist) {
      return { error: "Phone number already in use!" };
    }

    const password = generatePassword(12);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: businessName,
        email,
        password: hashedPassword,
        businessName,
        rcNumber,
        address,
        phoneNumber,
        role: "seller",
      },
    });

    await db.wallet.create({
      data: {
        userId: user.id,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    await sendNewSellerEmail(email, password);

    return { success: "Seller added successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const verifySeller = async (id: string) => {
  try {
    const seller = await getUserById(id);
    if (!seller || seller.role !== "seller") {
      return { error: "Seller does not exist!" };
    }

    await db.user.update({
      where: { id },
      data: {
        isVerifiedSeller: !seller.isVerifiedSeller,
      },
    });

    if (seller.isVerifiedSeller) {
      return { success: "Seller verification removed!" };
    }

    return { success: "Seller verification approved!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const verifyBuyer = async (id: string) => {
  try {
    const buyer = await getUserById(id);
    if (!buyer || buyer.role !== "buyer") {
      return { error: "Buyer does not exist!" };
    }

    await db.user.update({
      where: { id },
      data: {
        isVerifiedBuyer: !buyer.isVerifiedBuyer,
      },
    });

    if (buyer.isVerifiedBuyer) {
      return { success: "Buyer verification removed!" };
    }

    return { success: "Buyer verification approved!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
