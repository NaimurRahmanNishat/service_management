// src/modules/product/product.interface.ts

export interface CreateProductPayload {
  name: string;
  description: string;
  category: string;
  quantity: number;
  location: string;
  vendor?: string;
  adminCommission: number;
}
