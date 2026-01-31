// src/modules/users/user.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendError, sendSuccess } from "../../utils/response";
import * as userService from "./user.services";
import { GetUsersPayload } from "./user.interface";
import { Role } from "./user.model";


/* ================= GET ME ================= */
export const getmeController = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user?._id;
    const result = await userService.getMeService(user!);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});


/* ================= UPDATE PROFILE ================= */
export const updateProfileController = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user?._id;
    const file = req.file;
    const result = await userService.updateProfileService(user!, req.body, file);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});


/* ================= GET ALL USERS ================= */
export const getAllUsersController = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user?._id!;

    const payload: GetUsersPayload = {
        ...(req.query.limit && { limit: Number(req.query.limit) }),
        ...(req.query.cursor && { cursor: req.query.cursor as string }),
        ...(req.query.sortBy && { sortBy: req.query.sortBy as string }),
        ...(req.query.sortOrder && { sortOrder: req.query.sortOrder as "asc" | "desc" }),
        ...(req.query.search && { search: req.query.search as string }),
        ...(req.query.role && { role: req.query.role as Role }),
    };

    const result = await userService.getAllUsersService(userId, payload);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, result.message, result.data, 200, result.meta);
  }
);


/* ================= DELETE USER ================= */
export const deleteController = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id!;
    const result = await userService.deleteUserService(userId!);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }
    return sendSuccess(res, result.message, result.data, 200);
});
