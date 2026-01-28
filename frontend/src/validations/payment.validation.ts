// src/validations/payment.validation.ts
import { z } from "zod";

/* ================= Zod Schema ================= */
export const paymentSchema = z.object({
  addressLine: z.string().min(3, "Zip code is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;