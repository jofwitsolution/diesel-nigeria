"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import {
  BusinessProfileSchema,
  forgotPasswordSchema,
  IndividualSignUpSchema,
  LoginSchema,
  NewPasswordSchema,
} from "../validations";
import {
  getLoginRoute,
  getPasswordResetTokenByToken,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByRcNumber,
  getVerificationTokenByToken,
} from "../helpers/user";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "../db";
import { cloudinary } from "../helpers/cloudinary";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "../helpers/token";
import { sendPasswordResetEmail, sendVerificationEmail } from "../helpers/mail";
import { createNovuSubscriber } from "../helpers/novu";

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

    const newUser = await db.user.create({
      data: { name, email, password: hashedPassword, businessName: name },
    });

    // Subscribe new user for in app notification
    await createNovuSubscriber(newUser);

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

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

    const emailExist = await getUserByEmail(email);
    if (emailExist) {
      return { error: "Email already in use!" };
    }
    const rcNumberExist = await getUserByRcNumber(rcNumber);
    if (rcNumberExist) {
      return { error: "RC number already in use!" };
    }
    const phoneExist = await getUserByPhoneNumber(phoneNumber);
    if (phoneExist) {
      return { error: "Phone number already in use!" };
    }

    const newUser = await db.user.create({
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

    // Subscribe new user for in app notification
    await createNovuSubscriber(newUser);

    const result = await cloudinary.uploader.upload(fileData as string, {
      // resource_type: "raw",
      folder: "documents",
      public_id: `doc-${Date.now()}`,
    });

    await db.document.create({
      data: {
        url: result.url,
        public_id: result.public_id,
        userId: newUser.id,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

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

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
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

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const checkExistingUser = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  return { success: "Email doesn't exist!" };
};

export const newVerification = async (token: string) => {
  try {
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
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
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

export const forgotPassword = async (
  values: z.infer<typeof forgotPasswordSchema>
) => {
  try {
    const validatedFields = forgotPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid emaiL!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return { success: "Reset email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  try {
    if (!token) {
      return { error: "Missing token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Password updated!" };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
