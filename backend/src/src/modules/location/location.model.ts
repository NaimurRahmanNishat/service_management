// src/modules/location/location.model.ts
import { Schema, model, Document, Types } from "mongoose";

/* ================= TYPES ================= */
export type Division =
  | "Dhaka"
  | "Chattogram"
  | "Rajshahi"
  | "Khulna"
  | "Barisal"
  | "Sylhet"
  | "Rangpur"
  | "Mymensingh";

/* ================= INTERFACE ================= */
export interface ILocation extends Document {
  division: Division;
  district: string;
  area: string;
  subArea?: string;
  postalCode?: string;
  isActive: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/* ================= SCHEMA ================= */
const locationSchema = new Schema<ILocation>(
  {
    division: {
      type: String,
      required: [true, "Division is required"],
      enum: [
        "Dhaka",
        "Chattogram",
        "Rajshahi",
        "Khulna",
        "Barisal",
        "Sylhet",
        "Rangpur",
        "Mymensingh",
      ],
    },

    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },

    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
    },

    subArea: {
      type: String,
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= INDEX ================= */
locationSchema.index(
  { division: 1, district: 1, area: 1, subArea: 1 },
  { unique: true }
);

/* ================= MODEL ================= */
const Location = model<ILocation>("Location", locationSchema);
export default Location;
