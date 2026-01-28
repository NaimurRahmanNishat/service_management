// src/modules/booking/booking.controller.ts

import { Response } from "express";
import { sendError, sendSuccess } from "../../utils/response";
import * as bookingService from "./booking.service";
import { catchAsync } from "../../middleware/catchAsync";
import { AuthRequest } from "../../middleware/auth.middleware";


// ========================= 1. Create booking =========================
export const createBooking = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await bookingService.createBooking(req.body, req.user?._id!);
  if (!result.success) {
    return sendError(res, result.message, 400);
  }
  return sendSuccess(res, result.message, result.data, 201); 
});


// // ========================= 2. Get user bookings =========================
// export const getUserBookings = catchAsync(async (req: AuthRequest, res: Response) => {
//   const result = await bookingService.getUserBookings(req.user?._id!);

//   if (!result.success) {
//     return sendError(res, result.message, 400);
//   }

//   return sendSuccess(res, result.message, result.data, 200);
// });

// // ========================= 3. Get single booking =========================
// export const getSingleBooking = catchAsync(async (req: AuthRequest, res: Response) => {
//   const { id } = req.params;
//   const result = await bookingService.getSingleBooking(id, req.user?._id!, req.user?.role!);

//   if (!result.success) {
//     return sendError(res, result.message, result.statusCode || 404);
//   }

//   return sendSuccess(res, result.message, result.data, 200);
// });

// // ========================= 4. Cancel booking =========================
// export const cancelBooking = catchAsync(async (req: AuthRequest, res: Response) => {
//   const { id } = req.params;
//   const { cancellationReason } = req.body;

//   const result = await bookingService.cancelBooking(id, req.user?._id!, cancellationReason);

//   if (!result.success) {
//     return sendError(res, result.message, result.statusCode || 400);
//   }

//   return sendSuccess(res, result.message, result.data, 200);
// });