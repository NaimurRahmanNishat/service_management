// src/modules/service/service.validation.ts
import { z } from "zod";

const objectId = /^[0-9a-fA-F]{24}$/;

export const createServiceValidation = z.object({
  body: z
    .object({
      product: z.string().regex(objectId),
      location: z.string().regex(objectId),

      rentOptions: z
        .object({
          daily: z.boolean().optional(),
          monthly: z.boolean().optional(),
          yearly: z.boolean().optional(),
        })
        .refine(
          (data) => data.daily || data.monthly || data.yearly,
          { message: "At least one rent option must be enabled" }
        ),

      price: z.object({
        daily: z.number().min(0).optional(),
        monthly: z.number().min(0).optional(),
        yearly: z.number().min(0).optional(),
      }),
    })
    .refine(
      (data) => {
        if (data.rentOptions.daily && data.price.daily == null) return false;
        if (data.rentOptions.monthly && data.price.monthly == null) return false;
        if (data.rentOptions.yearly && data.price.yearly == null) return false;
        return true;
      },
      {
        message: "Price must be provided for selected rent options",
        path: ["price"],
      }
    ),
});


export const updateServiceValidation = z.object({
  body: z.object({
    price: z.number().min(0).optional(),
    isAvailable: z.enum(["available", "unavailable"]).optional(),
    isActive: z.boolean().optional(),
  }),
});
