// src/modules/service/service.interface.ts

import { Types } from "mongoose";
import { serviceAvailability } from "./service.model";
import { ProductCategory } from "../product/product.model";



export interface IRentOptions {
  daily?: boolean;
  monthly?: boolean;
  yearly?: boolean;
}

export interface IPriceOptions {
  daily?: number;
  monthly?: number;
  yearly?: number;
}

export interface ICreateServicePayload {
  product: Types.ObjectId;
  location: Types.ObjectId;
  rentOptions: IRentOptions;
  price: IPriceOptions;
}





/* ==================== UPDATE PAYLOAD ===================== */
export interface IUpdateServicePayload {
  price?: number;
  isAvailable?: serviceAvailability;
  isActive?: boolean;
}



export interface ICursorPaginationOptions {
  limit?: number | undefined;
  cursor?: string | Date | undefined;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  search?: string | undefined;
  searchFields?: string[] | undefined;
  category?: ProductCategory;
}
