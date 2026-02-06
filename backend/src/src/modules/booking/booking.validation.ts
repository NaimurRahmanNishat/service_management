// src/modules/booking/booking.validation.ts

import { z } from "zod";

// Create Booking Schema
export const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.string().min(1, "Service ID cannot be empty"),

    bookingType: z.enum(["day", "month", "year", "contract"]),

    duration: z.object({
      value: z
        .number()
        .int("Duration must be an integer")
        .min(1, "Duration must be at least 1"),
      unit: z.enum(["day", "month", "year"]),
    }),

    startDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date format",
      }),

    endDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date format",
      }),

    quantity: z
      .number()
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"),

    location: z
      .object({
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        zipCode: z.string().optional(),
      })
      .optional(),

    notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  }).refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  ),
});

// Cancel Booking Schema
export const cancelBookingSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .min(10, "Cancellation reason must be at least 10 characters")
      .max(500, "Cancellation reason cannot exceed 500 characters")
      .optional(),
  }),
});

// Update Status Schema
export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(
      ["pending", "confirmed", "active", "completed", "cancelled", "refunded"],
    ),
  }),
});

// Get Bookings Query Schema
export const getBookingsQuerySchema = z.object({
  query: z.object({
    limit: z.string().optional(),
    cursor: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    status: z
      .enum(["pending", "confirmed", "active", "completed", "cancelled", "refunded"])
      .optional(),
  }),
});
