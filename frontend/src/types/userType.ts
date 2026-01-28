// frontend/src/types/userType.ts

/* ================= ROLE ================= */
export type Role = "super_admin" | "admin" | "vendor" | "user";

/* ================= ADDRESS ================= */

export interface IAddress {
  street?: string;
  city?: string;
  division?: string;
  postalCode?: string;
}

/* ================= VENDOR DETAILS ================= */

export interface IVendorDetails {
  businessName?: string;
  businessLicense?: string;
  taxId?: string;
  accountNumber?: string;
  bankName?: string;
  assignedProducts?: string[];   
  assignedLocations?: string[]; 
  isApproved?: boolean;
  rating?: number;
  totalOrders?: number;
}

/* ================= AVATAR ================= */

export interface IAvatar {
  public_id: string | null;
  url: string;
}

/* ================= USER ================= */

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar: IAvatar;
  address?: IAddress;
  isActive: boolean;
  isVerified: boolean;
  vendorDetails?: IVendorDetails;
  refreshToken?: string | null;
  refreshTokenExpiry?: string | null;
  createdAt: string;
  updatedAt: string;
}
