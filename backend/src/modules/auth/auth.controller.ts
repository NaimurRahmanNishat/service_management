// src/modules/auth/auth.controller.ts

import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import { sendError, sendSuccess } from "../../utils/response";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookie";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as authService from "./auth.service";
import { getUserId } from "../users/user.repository";



/* ================= REGISTER USER ================= */
export const register = catchAsync(async (req: AuthRequest, res: Response) => {
  const currentUser = req.user;
  const result = await authService.registerUser(req.body, currentUser);
  if(!result?.success){
    return sendError(res, result.message || "Registration failed!", 400, result.errors);
  }
  return sendSuccess(res, result.message, result.data?.message ?? result.message);
});


/* ================= RESEND ACTIVATION USER ================= */
export const resendActivation = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.resendActivationUser(req.body);
  if(!result?.success){
    return sendError(res, result.message || "Resend activation failed!", 400, result.errors);
  }
  return sendSuccess(res, result.message, result.data?.message ?? result.message);
});


/* ================= ACTIVATE USER ================= */
export const activate = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.activateUser(req.body);
  if(!result?.success){
    return sendError(res, result.message || "Activation failed!", 400, result.errors);
  }
  return sendSuccess(res, result.message, result.data);
}); 


/* ================= LOGIN USER ================= */
export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  if (!result?.success) {
    return sendError(res, result.message || "Login failed!", 400, result.errors);
  }

  const { user, accessToken, refreshToken } = result.data!;

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    isActive: user.isActive,
  };

  // ✅ store tokens in httpOnly cookie
  setAuthCookies(res, accessToken, refreshToken);

  // ✅ send accessToken to frontend
  return sendSuccess(res, "Login successful", {
    user: safeUser,
    accessToken,
  });
});


/* ================= REFRESH ACCESS TOKEN ================= */
export const refresh = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return sendError(res, "Refresh token not found!", 401);
  }
  const result = await authService.refreshAccessToken(refreshToken);
  if (!result?.success) {
    return sendError(res, result.message || "Refresh token failed!", 401);
  }
  const { accessToken, refreshToken: newRefreshToken } = result.data!;
  // update cookies
  setAuthCookies(res, accessToken, newRefreshToken);
  // ✅ send accessToken to frontend
  return sendSuccess(res, "Access token refreshed", {
    accessToken,
  });
});


/* ================= SOCIAL AUTH ================= */
export const social = catchAsync(async (req: Request, res: Response) => {
  const { email, name, avatar } = req.body;

  const result = await authService.socialAuth(email, name, avatar);
  
  if (!result.success) {
    return sendError(res, result.message || 'Social authentication failed', 401, result.errors);
  }
  
  const { user, accessToken, refreshToken } = result.data!;
  setAuthCookies(res, accessToken, refreshToken);
  
  // Return user with tokens for frontend (consistent with login endpoint)
  return sendSuccess(res, 'Login successfully',  { user, accessToken });
});


/* ================= LOGOUT USER ================= */
export const logout = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = getUserId(req);
  const result = await authService.logoutUser(userId);
  
  if (!result.success) {
    return sendError(res, result.message || 'Logout failed', 500, result.errors);
  }
  
  clearAuthCookies(res);
  return sendSuccess(res, undefined, 'Logged out successfully');
});
