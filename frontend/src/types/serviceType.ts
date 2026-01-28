// src/types/serviceType.ts

import type { ILocation } from "./locationType";
import type { IProduct } from "./productType";

export type serviceAvailability = "available" | "unavailable";

/* ===================== INTERFACE ===================== */
export interface IService {
  _id: string;
  product: IProduct;
  vendor: string;
  location: ILocation;
  rentOptions: {
    daily?: boolean;
    monthly?: boolean;
    yearly?: boolean;
  }
  price: {
    daily?: number;
    monthly?: number;
    yearly?: number;
  }
  isAvailable: serviceAvailability;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}



// ================= Cursor Pagination =================
export interface ServiceMeta {
  limit: number;
  hasMore: boolean;
  nextCursor: string | null;
  sortBy: string;
  sortOrder: "asc" | "desc";
  totalFetched: number;
}

export interface GetAllServicesResponse {
  success: boolean;
  message: string;
  data: IService[];
  meta: ServiceMeta;
}

export interface GetAllServicesParams {
  limit?: number;
  cursor?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchFields?: string[];
  status?: "available" | "unavailable";
}


