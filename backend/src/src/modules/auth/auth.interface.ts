// src/modules/users/user.interface.ts

import { IUser } from "../users/user.model";




// Interface for registration data
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: IUser["role"];
}