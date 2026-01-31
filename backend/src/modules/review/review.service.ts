// src/modules/review/review.service.ts
import Review from "./review.model";
import Service from "../service/service.model";
import { IGetReviewsOptions } from "./review.interface";
import { calculateCursorPagination, createCursorPaginationMeta } from "../../helper/cursorPagination";
import { Types } from "mongoose";


/* ================= CREATE REVIEW ================= */
export const createReview = async ( userId: string, payload: { serviceId: string; rating: number; comment?: string }) => {
  const service = await Service.findById(payload.serviceId);
  if (!service) {
    throw new Error("Service not found");
  }

  const review = await Review.create({
    user: userId,
    vendor: service.vendor,
    service: service._id,
    rating: payload.rating,
    comment: payload.comment,
  });

  return { success: true, message: "Review created successfully", data: review  };
};


/* ================= GET ALL REVIEWS ================= */
export const getReviewsByService = async ( serviceId: string, options: IGetReviewsOptions ) => {
  const { limit, sortBy, sortOrder, filter } = calculateCursorPagination({
    ...options,
    searchFields: ["comment"], // search only comment
  });

  const reviews = await Review.find({
    service: new Types.ObjectId(serviceId),
    ...filter,
  })
    .populate("user", "name avatar")
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .limit(limit + 1); // extra one for cursor check

  const data = createCursorPaginationMeta(
    reviews,
    limit,
    sortBy,
    sortOrder,
    options.search
  );
    return { success: true, message: "Reviews fetched successfully", data: data, meta: data.meta };
};


/* ================= UPDATE REVIEW ================= */
export const updateReview = async ( reviewId: string, userId: string, payload: { rating?: number; comment?: string }) => {
  const review = await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    payload,
    { new: true }
  );

  if (!review) {
    throw new Error("Review not found or unauthorized");
  }

  return { success: true, message: "Review updated successfully", data: review  };
};


/* ================= DELETE REVIEW ================= */
export const deleteReview = async (reviewId: string, userId: string) => {
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: userId,
  });

  if (!review) {
    throw new Error("Review not found or unauthorized");
  }

  return { success: true, message: "Review deleted successfully", data: null  };
};
