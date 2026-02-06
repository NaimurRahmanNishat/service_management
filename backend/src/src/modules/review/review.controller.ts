// src/modules/review/review.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import * as ReviewService  from "./review.service";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendError, sendSuccess } from "../../utils/response";


/* ================= CREATE REVIEW ================= */
export const createReview = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user?._id;

    const result = await ReviewService.createReview(user!, req.body);

    if(!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, result.message, result.data, 201);
  },
);


/* ================= GET ALL REVIEWS ================= */
export const getReviewsByService = catchAsync(async (req: Request, res: Response) => {
    const { serviceId } = req.params!;

    const payload = {
      limit: Number(req.query.limit),
      cursor: req.query.cursor as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as "asc" | "desc",
      search: req.query.search as string,
    };

    const result = await ReviewService.getReviewsByService(serviceId!, payload);
    if(!result.success) {
      return sendError(res, "Failed to fetch reviews", 500);
    }

    return sendSuccess(res, result.message, result.data, 200, result.meta);
  }
);


/* ================= UPDATE REVIEW ================= */
export const updateReview = catchAsync(async (req: AuthRequest, res: Response) => {

    const user = req.user?._id;

    const result = await ReviewService.updateReview( req.params.id!, user!, req.body);
    if (!result.success) {
      return sendError(res, "Review not found or unauthorized", 404);
    }

    return sendSuccess(res, "Review updated successfully", result.data);
  },
);


/* ================= DELETE REVIEW ================= */
export const deleteReview = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user?._id;

    const result = await ReviewService.deleteReview(req.params.id!, user!);
    if (!result.success) {
      return sendError(res, "Review not found or unauthorized", 404);
    }

    return sendSuccess(res, "Review deleted successfully", null);
  },
);
