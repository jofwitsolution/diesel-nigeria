import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const IndividualSignUpSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name is required",
      })
      .max(50, { message: "Name cannot exceed 50 char." }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password cannot be less than 8 char.",
      })
      .max(20, {
        message: "Password cannot exceed 20 char.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export const BusinessProfileSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Business name is required",
    })
    .max(50, { message: "Name cannot exceed 50 char." }),
  rcNumber: z.string().min(1, {
    message: "RC number is required",
  }),
  address: z
    .string()
    .min(3, {
      message: "Address is required.",
    })
    .max(100, {
      message: "Address cannot exceed 100 char.",
    }),
  phoneNumber: z.string().min(1, {
    message: "Please input phone number.",
  }),
});

export const NewSellerSchema = z.object({
  businessName: z
    .string()
    .min(3, {
      message: "Business name is required",
    })
    .max(50, { message: "Name cannot exceed 50 char." }),
  rcNumber: z.string().min(1, {
    message: "RC number is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  address: z
    .string()
    .min(3, {
      message: "Address is required.",
    })
    .max(100, {
      message: "Address cannot exceed 100 char.",
    }),
  phoneNumber: z.string().min(1, {
    message: "Please input phone number.",
  }),
});

export const SellerBusinessInfoSchema = z.object({
  address: z
    .string()
    .min(3, {
      message: "Address is required.",
    })
    .max(100, {
      message: "Address cannot exceed 100 char.",
    }),
  businessDescription: z
    .string({ invalid_type_error: "Enter business description" })
    .min(50, {
      message: "Description must be at least 50 char.",
    }),
  businessName: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
});

export const SellerVerificationDocSchema = z.object({
  businessRegisteration: z.string({ invalid_type_error: "" }).optional(),
  rcNumber: z.string({ invalid_type_error: "" }).optional(),
});
