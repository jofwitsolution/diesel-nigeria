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

export const ResetPasswordSchema = z
  .object({
    currentPassword: z.string({
      required_error: "Current password cannot be empty",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "Password cannot be less than 8 char.",
      })
      .max(20, {
        message: "Password cannot exceed 20 char.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
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

export const BranchSchema = z.object({
  state: z.string({
    required_error: "State is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  address: z.string().min(3, {
    message: "Address is required.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please input phone number.",
  }),
});

export const ProductSchema = z.object({
  isAvailable: z.boolean(),
  density: z.string({
    required_error: "Velocity cannot be empty",
  }),
  price: z.string({
    required_error: "Price cannot be empty",
  }),
  numberInStock: z.string({
    required_error: "Enter a valid volume",
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

export const BankDetailsSchema = z.object({
  accountNumber: z
    .string({ invalid_type_error: "Enter account number" })
    .min(10, {
      message: "Invalid account number",
    })
    .max(10, {
      message: "Invalid account number",
    }),
  bank: z.string({ invalid_type_error: "Enter bank name" }).min(3, {
    message: "Enter a valid bank",
  }),
  accountName: z.string({ invalid_type_error: "Enter account name" }).min(5, {
    message: "Enter a valid name",
  }),
});

export const PlaceOrderSchema = z.object({
  businessName: z
    .string({
      required_error: "Company name is required",
    })
    .min(3, {
      message: "Company name is required",
    }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please input phone number.",
  }),
  deliveryLocation: z
    .string({ required_error: "Location is required." })
    .min(3, {
      message: "Location is required.",
    }),
  branch: z
    .string({
      required_error: "Select a branch.",
    })
    .min(3, {
      message: "You must select a branch.",
    }),
  product: z
    .string({
      required_error: "Select diesel density.",
    })
    .min(3, {
      message: "Select diesel density.",
    }),
  quantity: z
    .string({
      required_error: "Quantity is required.",
    })
    .min(1, {
      message: "Quantity is required.",
    }),
  deliveryDate: z
    .date({
      required_error: "Delivery date is a required field.",
    })
    .min(new Date(Date.now() - 86400000), {
      // minimum is current date minus one day (86400000)
      message: "Delivery date must be a future date.",
    }),
  message: z
    .string({
      invalid_type_error: "Input message",
    })
    .optional(),
});
