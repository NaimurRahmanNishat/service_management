// src/validations/updateProfile.validation.ts
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
  address: z.object({
    city: z.string().optional(),
    division: z.string().optional(),
    postalCode: z.string().optional(),
  })
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
