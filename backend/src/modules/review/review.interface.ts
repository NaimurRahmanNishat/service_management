//  src/modules/review/review.interface.ts

import { Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  vendor: Types.ObjectId;
  service: Types.ObjectId;
  rating: number;
  comment?: string;
}


export interface IGetReviewsOptions {
  limit?: number;
  cursor?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}