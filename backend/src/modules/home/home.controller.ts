// src/modules/home/home.controller.ts

import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import * as homeService from "./home.service";
import { sendError, sendSuccess } from "../../utils/response";


// ========================= 1. create home data =============================
export const createHome = catchAsync(async (req: Request, res: Response) => {
  const result = await homeService.createHomeData(
    req.body,
    req.files as any
  );

  if (!result.success) {
    return sendError(res, result.message!, 400);
  }

  res.status(201).json({
    success: true,
    message: result.message,
    data: result.data,
  });
});


// ========================= 2. Get All Homes =========================
export const getAllHome = catchAsync(async (req: Request, res: Response) => {
  const result = await homeService.getAllHomes(req);
  sendSuccess(res, "Homes retrieved successfully", result);
});


// ========================= 3. Update Home (Single Endpoint) =========================
export const updateHome = catchAsync(async (req: Request, res: Response) => {
  const result = await homeService.updateHomeData(
    req.params.id!,
    req.body,
    req.files as any
  );

  if (!result.success) {
    return sendError(res, result.message!, 400);
  }

  sendSuccess(res, result.message, result.data);
});


// ========================= 4. Delete Home =========================
export const deleteHome = catchAsync(async (req: Request, res: Response) => {
  const result = await homeService.deleteHome(req.params.id!);

  if (!result.success) {
    return sendError(res, result.message!, 404);
  }

  sendSuccess(res, result.message);
});

