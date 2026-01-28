// src/modules/payment/payment.model.ts

import mongoose, { Document, Schema } from "mongoose";

// ============== ENUMS ==============
export type PaymentMethod = "bkash" | "stripe" | "iot_scanner" | "cash";
export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

// ============== INTERFACE ==============
export interface IPayment extends Document {
  booking: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;

  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  commission?: {       // Add this
    website: number;
    vendor: number;
    admin: number;
  };

  transactionId: string;
  gatewayResponse?: any;

  createdAt?: Date;
  updatedAt?: Date;
}

// ============== SCHEMA ==============
const paymentSchema = new Schema<IPayment>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      enum: ["bkash", "stripe", "iot_scanner"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    commission: {
      website: { type: Number, default: 0 },
      vendor: { type: Number, default: 0 },
      admin: { type: Number, default: 0 },
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    gatewayResponse: {
      type: Schema.Types.Mixed,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

// ============== INDEXES ==============
paymentSchema.index({ user: 1, status: 1 });
paymentSchema.index({ vendor: 1, status: 1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ createdAt: -1 });

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;
