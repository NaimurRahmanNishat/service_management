// src/modules/stats/stats.controller.ts
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { catchAsync } from "../../middleware/catchAsync";
import { sendError, sendSuccess } from "../../utils/response";
import * as statsService from "./stats.service";


/* ================= GET SUPER ADMIN STATS ================= */
export const superAdminStatsController = catchAsync(async(req: AuthRequest, res: Response) => {
    const user = req.user!;
    if(user.role !== "super_admin") {
        return sendError(res, "Unauthorized access", 401);
    }

    const result = await statsService.superAdminStatsService(user);
    if(!result.success) {
        return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});


/* ================= GET ADMIN STATS ================= */
export const adminStatsController = catchAsync(async(req: AuthRequest, res: Response) => {
    const user = req.user!;
    if(user.role !== "admin") {
        return sendError(res, "Unauthorized access", 401);
    }

    const result = await statsService.adminStatsService(user);
    if(!result.success) {
        return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});


/* ================= GET VENDOR STATS ================= */
export const vendorStatsController = catchAsync(async(req: AuthRequest, res: Response) => {
    const user = req.user!;
    if(user.role !== "vendor") {
        return sendError(res, "Unauthorized access", 401);
    }

    const result = await statsService.vendorStatsService(user);
    if(!result.success) {
        return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});


/* ================= GET USER STATS ================= */
export const userStatsController = catchAsync(async(req: AuthRequest, res: Response) => {
    const user = req.user!;
    if(user.role !== "user") {
        return sendError(res, "Unauthorized access", 401);
    }

    const result = await statsService.userStatsService(user);    
    if(!result.success) {
        return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});
