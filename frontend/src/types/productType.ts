// src/types/productType.ts

import type { ILocation } from "./locationType";
export type ProductCategory = "technology" | "health" | "lifestyle" | "fitness" | "house" | "land" | "vehicle" | "others";

export interface IProduct {
  _id: string;
  name: string;
  vendor: string;
  location: ILocation;
  description: string;
  category: ProductCategory;
  images: { public_id: string | null; url: string }[];
  rating?: {
    average: number;
    count: number;
  };
  quantity: number;
  commission: {
    platform: number;
    admin: number;
    vendor: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
