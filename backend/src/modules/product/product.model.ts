// src/modules/product/product.model.ts
import { Schema, model, Types, Document } from "mongoose";

export type ProductCategory =
  | "technology"
  | "health"
  | "lifestyle"
  | "fitness"
  | "house"
  | "land"
  | "vehicle"
  | "others";

export interface IProduct extends Document {
  name: string;
  vendor: Types.ObjectId;
  location: Types.ObjectId;
  description: string;
  category: ProductCategory;
  images: { public_id: string | null; url: string }[];
  rating?: {
    average: number;
    count: number;
  };
  quantity: number;
  vendorCommissionRate: number; 
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },

    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "technology",
        "health",
        "lifestyle",
        "fitness",
        "house",
        "land",
        "vehicle",
        "others",
      ],
      required: true,
    },

    images: [
      {
        public_id: { type: String, default: null },
        url: { type: String, required: true },
      },
    ],

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    quantity: { type: Number, required: true, min: 0 },

    vendorCommissionRate: {
      type: Number,
      required: true,
      default: 40,  // Default 50%
      min: 0,
      max: 90,  // Max 90% (since website takes 10%)
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
