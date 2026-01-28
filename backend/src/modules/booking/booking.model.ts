// src/modules/booking/booking.model.ts

import mongoose from "mongoose";

// ================= ENUMS =================
export type BookingType = "daily" | "monthly" | "yearly";
export type BookingStatus = "pending" | "completed" | "cancelled" | "refunded";

// ================= INTERFACE =================
export interface IBooking extends mongoose.Document {
  service: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;  
  vendor: mongoose.Types.ObjectId;  
  user: mongoose.Types.ObjectId;
  
  bookingType: BookingType;
  duration: number; 
  startDate: Date;
  quantity: number;
  
  pricing: {
    unitPrice: number;        
    totalPrice: number;        
    vendorCommissionRate: number; 
  };
  
  status: BookingStatus;
  payment?: mongoose.Types.ObjectId;
  
  notes?: string;
  cancellationReason?: string;
  cancelledAt?: Date;
  
  createdAt?: Date;
  updatedAt?: Date;
}

// ================= SCHEMA =================
const bookingSchema = new mongoose.Schema<IBooking>(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    bookingType: {
      type: String,
      required: true,
      enum: ["daily", "monthly", "yearly"],
    },
    
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    
    startDate: Date,
    
    
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    
    pricing: {
      unitPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      vendorCommissionRate: {
        type: Number,
        required: true,
        min: 0,
        max: 90,
      },
    },
    
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled", "refunded"],
      default: "pending",
    },
    
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    
    notes: String,
    cancellationReason: String,
    cancelledAt: Date,
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ vendor: 1, status: 1 });
bookingSchema.index({ service: 1, status: 1 });
bookingSchema.index({ product: 1, status: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;