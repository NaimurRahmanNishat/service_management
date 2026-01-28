// // src/modules/service/service.model.ts

import mongoose, { Schema, Document, Types } from "mongoose";

export type serviceAvailability = "available" | "unavailable";
export type rentType = "daily" | "monthly" | "yearly";

/* ===================== INTERFACE ===================== */
export interface IService extends Document {
  product: Types.ObjectId;
  vendor: Types.ObjectId;
  location: Types.ObjectId;
  rentOptions: {
    daily: boolean;
    monthly: boolean;
    yearly: boolean;
  }
  price: {
    daily?: number;
    monthly?: number;
    yearly?: number;
  };
  isAvailable: serviceAvailability;
  isActive: boolean;
  createdBy?: Types.ObjectId;
}

/* ===================== SCHEMA ===================== */

const serviceSchema = new Schema<IService>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

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

    rentOptions: {
      daily: { type: Boolean, default: false },
      monthly: { type: Boolean, default: false },
      yearly: { type: Boolean, default: false },
    },


    price: {
      daily: {
        type: Number,
        min: 0,
        required: function (this: any) {
          return this.rentOptions?.daily === true;
        },
      },
      monthly: {
        type: Number,
        min: 0,
        required: function (this: any) {
          return this.rentOptions?.monthly === true;
        },
      },
      yearly: {
        type: Number,
        min: 0,
        required: function (this: any) {
          return this.rentOptions?.yearly === true;
        },
      },
    },

    isAvailable: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    isActive: { type: Boolean, default: true },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


/* ==================== Auto unavailable when product stock = 0 ===================== */
serviceSchema.pre("save", async function (next) {
  const Product = mongoose.model("Product");
  const product = await Product.findById(this.product);

  if (!product || product.quantity <= 0) {
    this.isAvailable = "unavailable";
  }
  next();
});


const Service = mongoose.model<IService>("Service", serviceSchema);
export default Service;


