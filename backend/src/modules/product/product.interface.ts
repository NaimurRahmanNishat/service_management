// src/modules/product/product.interface.ts

import { ProductCategory } from "./product.model";

export interface CreateProductPayload {
  name: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  location: string;
  vendor?: string;
  adminCommission: number;
}
