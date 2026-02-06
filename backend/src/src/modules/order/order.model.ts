import { Schema, model, Types, Document } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId;
  service: Types.ObjectId;
  product: Types.ObjectId;
  selectedRent: "daily" | "monthly" | "yearly";
  quantity: number;
  totalAmount: number;

  commission: {
    platform: number;
    admin: number;
    vendor: number;
  };

  paymentStatus: "pending" | "paid" | "failed";
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    selectedRent: {
      type: String,
      enum: ["daily", "monthly", "yearly"],
      required: true,
    },


    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    commission: {
      platform: { type: Number, required: true },
      admin: { type: Number, required: true },
      vendor: { type: Number, required: true },
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
