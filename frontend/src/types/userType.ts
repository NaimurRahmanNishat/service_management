// frontend/src/types/userType.ts

export type Role = "user" | "vendor" | "admin" | "super_admin";

/* ================= ADDRESS ================= */
export interface IAddress {
  street?: string;
  city?: string;
  division?: string;
  postalCode?: string;
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
  totalCommissionEarned?: number;
  pendingCommission?: number;
  refreshToken?: string | null;
  refreshTokenExpiry?: string | null;
  createdAt: string;
  updatedAt: string;
}



/* ================= GET ME ================= */
export interface IGetMeResponse {
  success: boolean;
  message: string;
  data: IUser;
}


/* ================= UPDATE PROFILE ================= */
export interface IUpdateProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}


/* ================= GET ALL USERS ================= */
export interface IAllUserResponse {
  success: boolean;
  message: string;
  data: IUser[];
  meta: {
    limit: number,
    hasMore: boolean,
    nextCursor: string | null,
    sortBy: string,
    sortOrder: "asc" | "desc",
    totalFetched: number
  }
}

export interface GetAllUsersParams {
  limit?: number;
  cursor?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  role?: Role;
}


/* ================= DELETE USER ================= */
export interface IDeleteUserResponse {
  success: boolean;
  message: string;
}