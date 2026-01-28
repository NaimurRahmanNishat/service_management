// src/types/reviewType.ts

import type { IService } from "./serviceType";
import type { IUser } from "./userType";


export interface IReview {
  _id: string;
  service: IService;
  vendor: string;
  user: IUser;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}