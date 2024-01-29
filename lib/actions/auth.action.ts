"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { IndividualSignUpSchema } from "../validations";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export const registerIndividual = async (
  values: z.infer<typeof IndividualSignUpSchema>
) => {
  try {
    connectToDatabase();

    const validatedFields = IndividualSignUpSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    await User.create({ name, email, password: hashedPassword });

    // TODO: Send email verification

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "Something failed! Try again!" };
  }
};
