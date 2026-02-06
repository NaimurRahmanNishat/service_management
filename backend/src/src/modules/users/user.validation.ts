// src/modules/users/user.validation.ts
import { z } from "zod";


export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(11).optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      division: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
  }),
});

