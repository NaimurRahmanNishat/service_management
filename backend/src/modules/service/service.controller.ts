// src/modules/service/service.controller.ts
import * as serviceService from "./service.service";
import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import { sendError, sendSuccess } from "../../utils/response";
import { AuthRequest } from "../../middleware/auth.middleware";
import { ProductCategory } from "../product/product.model";
import { getCache, invalidateCacheAsync, setCache } from "../../utils/cache";
import { USER_CACHE_TTL } from "../../config/cacheConfig";



/* ========================== 1. create service ========================== */
export const createService = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user;

    if (!user) {
      return sendError(res, "Unauthorized", 401);
    }

    const result = await serviceService.createService(req.body, user);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }

  /* ================== INVALIDATE ALL CACHE ================== */
  invalidateCacheAsync("services:");

    return sendSuccess(res, result.message, result.data, 201);
  }
);


/* ========================== GET ALL SERVICES ========================== */
export const getAllServices = catchAsync(async (req: Request, res: Response) => {

  const payload = {
    limit: req.query.limit ? Number(req.query.limit) : 10,
    cursor: req.query.cursor as string,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
    search: req.query.search as string,
    category: req.query.category as ProductCategory,
  };

  /* ================== CACHE KEY ================== */
  const cacheKey = `services:limit=${payload.limit}|cursor=${payload.cursor ?? "null"}|sort=${payload.sortBy}:${payload.sortOrder}|search=${payload.search ?? ""}|category=${payload.category ?? "all"}`;

  /* ================== GET CACHE ================== */
  const cached = await getCache(cacheKey);
  if (cached) {
    return sendSuccess(
      res,
      "Services fetched from cache",
      cached.data,
      200,
      cached.meta
    );
  }

  /* ================== DB QUERY ================== */
  const result = await serviceService.getAllServices(payload);

  if (!result.success) {
    return sendError(res, result.message, 400);
  }

  /* ================== SET CACHE ================== */
  await setCache(cacheKey, { data: result.data, meta: result.meta}, USER_CACHE_TTL);

  return sendSuccess(res, result.message, result.data, 200, result.meta);
});


/* ========================== 3. get single service ========================== */
export const getSingleService = catchAsync(async (req: Request, res: Response) => {
    const result = await serviceService.getSingleService(req.params.id!);

    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, result.message, result.data, 200);
  }
);


/* ========================== 4. update service ========================== */
export const updateService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await serviceService.updateService(
      req.params.id!,
      req.body
    );

  /* ================== INVALIDATE ALL CACHE ================== */
  invalidateCacheAsync("services:");

    res.json({
      success: true,
      message: "Service updated successfully",
      data: result,
    });
  }
);


/* ========================== 5. delete service ========================== */
export const deleteService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await serviceService.deleteService(req.params.id!);

  /* ================== INVALIDATE ALL CACHE ================== */
  invalidateCacheAsync("services:");
  
    res.json({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  }
);
