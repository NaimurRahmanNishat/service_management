// src/modules/review/review.validation.ts
import { z } from "zod";

const objectId = /^[0-9a-fA-F]{24}$/;

export const createReviewValidation = z.object({
  body: z.object({
    serviceId: z.string().regex(objectId),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const updateReviewValidation = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});
