// src/modules/users/user.interface.ts

import { Role } from "./user.model";

export interface IUserType {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    division?: string;
    postalCode?: string;
  };
}

export interface GetUsersPayload {
  limit?: number;
  cursor?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  role?: Role;
}
