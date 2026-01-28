// src/modules/service/service.controller.ts
import * as serviceService from "./service.service";
import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import { sendError, sendSuccess } from "../../utils/response";
import { AuthRequest } from "../../middleware/auth.middleware";



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

    return sendSuccess(res, result.message, result.data, 201);
  }
);


/* ========================== 2. get all services ========================== */
export const getAllServices = catchAsync(async (req: Request, res: Response) => {

  const payload = {
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    cursor: req.query.cursor as string,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as "asc" | "desc",
    search: req.query.search as string,
  };

    const result = await serviceService.getAllServices(payload);

    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, result.message, result.data, 200, result.meta);

  }
);


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

    res.json({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  }
);
