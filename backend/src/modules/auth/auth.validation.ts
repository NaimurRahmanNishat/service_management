// src/modules/auth/auth.validation.ts
import { z } from "zod";

/* ================= REGISTER ================= */

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(11),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.enum(["user", "vendor", "admin", "super_admin"]).optional(),
  }).refine(d => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }),
});

/* ================= ACTIVATE ================= */

export const activateUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),
});

/* ================= RESEND ================= */

export const resendActivationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

/* ================= LOGIN ================= */

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

/* ================= REFRESH ================= */

export const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

/* ================= SOCIAL ================= */

export const socialLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(3),
    avatar: z.string().url().optional(),
  }),
});
