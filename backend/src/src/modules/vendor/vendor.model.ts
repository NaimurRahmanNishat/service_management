// src/modules/vendor/vendor.model.ts
import mongoose, { Schema, Types } from "mongoose";

export interface IVendor extends Document {
  user: Types.ObjectId;

  shopName: string;
  businessLicense?: string;
  taxId?: string;

  // Bank Details
  accountNumber?: string;
  bankName?: string;
  accountHolderName?: string;

  // References
  locations: Types.ObjectId[];
  assignedProducts: Types.ObjectId[];

  // Financial Fields
  balance: number;              // Available balance for withdrawal
  totalEarnings: number;        // Lifetime total earnings
  pendingBalance: number;       // Payment in processing/escrow
  totalWithdrawn: number;       // Total amount withdrawn till date

  // Performance Metrics
  rating: number;
  totalOrders: number;
  totalSales: number;           // Total sales amount

  isApproved: boolean;
  isActive: boolean;

  // Audit
  createdBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const vendorSchema = new Schema<IVendor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    businessLicense: {
      type: String,
      trim: true,
    },

    taxId: {
      type: String,
      trim: true,
    },

    // Bank Details
    accountNumber: {
      type: String,
      trim: true,
    },

    bankName: {
      type: String,
      trim: true,
    },

    accountHolderName: {
      type: String,
      trim: true,
    },

    // References
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],

    assignedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // Financial Fields
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    pendingBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalWithdrawn: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Performance Metrics
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Status
    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Audit
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);


/* ================= INDEXES ================= */

vendorSchema.index({ user: 1 }, { unique: true });
vendorSchema.index({ isApproved: 1, isActive: 1 });
vendorSchema.index({ shopName: 1 });
vendorSchema.index({ rating: -1 });
vendorSchema.index({ totalSales: -1 });
vendorSchema.index({ createdAt: -1 });

/* ================= METHODS ================= */

// Method to update vendor balance after payment
vendorSchema.methods.addEarnings = async function(amount: number) {
  this.pendingBalance += amount;
  this.totalEarnings += amount;
  return this.save();
};

// Method to release pending balance
vendorSchema.methods.releasePendingBalance = async function() {
  this.balance += this.pendingBalance;
  this.pendingBalance = 0;
  return this.save();
};

// Method to process withdrawal
vendorSchema.methods.processWithdrawal = async function(amount: number) {
  if (this.balance < amount) {
    throw new Error("Insufficient balance");
  }
  this.balance -= amount;
  this.totalWithdrawn += amount;
  return this.save();
};


/* ================= MODEL ================= */
const Vendor = mongoose.model<IVendor>("Vendor", vendorSchema);
export default Vendor;
