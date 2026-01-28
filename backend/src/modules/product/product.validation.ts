// src/modules/product/product.validation.ts
import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().min(10),

    category: z.enum([
      "technology",
      "health",
      "lifestyle",
      "fitness",
      "house",
      "land",
      "vehicle",
      "others",
    ]),

    quantity: z.coerce.number().int().min(0),

    location: z.string().min(1),

    vendor: z.string().optional(),

    adminCommission: z.coerce
      .number()
      .min(0)
      .max(95, "Admin commission too high"),
  }),
});
