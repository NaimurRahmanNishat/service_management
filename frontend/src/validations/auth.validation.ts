// src/validations/auth.validation.ts
import { z } from "zod";

/* ================ Registration Schema ================ */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;


/* ================ OTP Activation Schema ================ */
export const activationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 characters")
    .regex(/^[A-Za-z0-9]+$/, "OTP must be alphanumeric"),
});

export type ActivationSchemaType = z.infer<typeof activationSchema>;