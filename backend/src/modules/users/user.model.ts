// src/modules/users/user.model.ts

import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

/* ================= TYPES ================= */

export type Role = "user" | "vendor" | "admin" | "super_admin";

export interface Address {
  street?: string;
  city?: string;
  division?: string;
  postalCode?: string;
}

/* ================= USER INTERFACE ================= */

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  avatar: { public_id: string | null; url: string };
  refreshToken?: string | null;
  refreshTokenExpiry?: Date | null;
  address?: Address;
  isActive: boolean;
  isVerified: boolean;
  // Admin specific fields
  totalCommissionEarned?: number;  // For super_admin only
  pendingCommission?: number;      // For super_admin only

  comparePassword(candidatePassword: string): Promise<boolean>;
  compareRefreshToken(token: string): Promise<boolean>;
}

/* ================= SCHEMA ================= */

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin", "super_admin"],
      default: "user",
    },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    refreshToken: { type: String, default: null, },
    refreshTokenExpiry: { type: Date, default: null, },
    address: {
      street: String,
      city: String,
      division: String,
      postalCode: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    totalCommissionEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingCommission: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= MIDDLEWARE ================= */

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/* ================= METHODS ================= */

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.compareRefreshToken = async function (token: string): Promise<boolean> {
  if (!this.refreshToken) return false;
  return bcrypt.compare(token, this.refreshToken);
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }); 
userSchema.index({ role: 1 }); 
userSchema.index({ isVerified: 1 });
userSchema.index({ createdAt: -1 }); 

/* ================= MODEL ================= */

const User = mongoose.model<IUser>("User", userSchema);

export default User;



