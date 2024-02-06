"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import {
  BusinessProfileSchema,
  IndividualSignUpSchema,
  LoginSchema,
} from "../validations";
import {
  getLoginRoute,
  getUserByEmail,
  getVerificationTokenByToken,
} from "../helpers/user";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "../db";
import { cloudinary } from "../helpers/cloudinary";
import { currentTimestamp } from "../utils";
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

export const registerOrganization = async (
  fileData: string | ArrayBuffer | null,
  businessProfile: z.infer<typeof BusinessProfileSchema>,
  signupData: z.infer<typeof IndividualSignUpSchema> | null
) => {
  try {
    const signupDataFields = IndividualSignUpSchema.safeParse(signupData);

    if (!signupDataFields.success) {
      return { error: "Invalid credentials! Go back." };
    }

    const businessProfileFields =
      BusinessProfileSchema.safeParse(businessProfile);

    if (!businessProfileFields.success) {
      return { error: "Invalid business Profile!" };
    }

    if (!fileData) {
      return { error: "Invalid business document!" };
    }

    const { name, email, password } = signupDataFields.data;
    const {
      name: businessName,
      rcNumber,
      address,
      phoneNumber,
    } = businessProfileFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        businessName,
        rcNumber,
        address,
        phoneNumber,
      },
    });

    const result = await cloudinary.uploader.upload(fileData as string, {
      // resource_type: "raw",
      folder: "documents",
      public_id: `doc-${currentTimestamp()}`,
    });

    await db.document.create({
      data: {
        url: result.url,
        public_id: result.public_id,
        userId: user.id,
      },
    });

    return { success: "Business Profile submitted." };
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

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(
  //     existingUser.email,
  //   );

  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token,
  //   );

  //   return { success: "Confirmation email sent!" };
  // }

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

export const logout = async () => {
  await signOut();
};

export const checkExistingUser = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  console.log(existingUser);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  return { success: "Email doesn't exist!" };
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
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
