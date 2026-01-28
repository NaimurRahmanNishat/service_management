// src/types/authType.ts

import type { IUser } from "./userType";

// ============================== 1. Registration input & response ==============================
export interface IRegisterUserInput {
  avatar:string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface IRegisterResponse {
  message?: string;
  data?: {
    user: IUser;
  };
}


// ============================== 2. Account activation input & response ==============================
export interface IActivateUserInput {
  email: string;
  otp: string;
}

export interface IActivateResponse {
  message?: string;
  data?: {
    user: IUser;
  };
}


// ============================== 3. Resend activation input & response ==============================
export interface IResendActivationInput {
  email: string;
}

export interface IResendActivationResponse {
  success?: boolean;
  message?: string;
  data?: {
    message: string;
  };
}



// ============================== 4. Login input & response ==============================
export interface ILoginUserInput {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;          
    accessToken: string;   
  };
}


// ============================== 5. Logout response & response ==============================
export interface ILogoutResponse {
  success: boolean;
  data?: null;
  message?: string;
}
