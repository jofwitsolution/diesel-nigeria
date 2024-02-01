"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { IndividualSignUpSchema, LoginSchema } from "../validations";
import { getLoginRoute, getUserByEmail } from "../helpers/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "../db";
// import { generateVerificationToken } from "../helpers/token";
// import { sendVerificationEmail } from "../helpers/mail";

export const registerIndividual = async (
  values: z.infer<typeof IndividualSignUpSchema>
) => {
  try {
    const validatedFields = IndividualSignUpSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token
    // );

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || getLoginRoute(existingUser.role),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

interface OAuthParams {
  provider: "google" | "github";
  callbackUrl: string | null;
}

export const OAuthLogin = async ({ provider, callbackUrl }: OAuthParams) => {
  try {
    await signIn(provider, {
      redirectTo: callbackUrl || "/buyer/overview",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
