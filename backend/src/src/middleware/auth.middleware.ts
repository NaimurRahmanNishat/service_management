// src/middleware/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import config from "../config";

export interface AuthUser {
  _id: string;
  role: string;
  email?: string; 
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

/* ================= JWT PAYLOAD ================= */
type JwtAccessPayload = { id: string; role: string; email?: string; };


/* ================= AUTH ================= */
export const isAuthenticated = ( req: AuthRequest, res: Response, next: NextFunction ) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError(401, "Access token missing"));

  try {
    const decoded = jwt.verify( token, config.jwt_access_secret! ) as JwtAccessPayload;
    const user: AuthUser = { _id: decoded.id, role: decoded.role };
    if (decoded.email !== undefined) {
      user.email = decoded.email;
    }
    req.user = user;
    next();
  } catch {
    return next(new AppError(401, "Invalid access token"));
  }
};


/* ================= AUTHORIZE ROLE ================= */
export const authorizeRole = (...roles: string[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError(403, "Not authorized"));
    }
    next();
  };


/* ================= OPTIONAL AUTH ================= */
export const optionalAuth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  if (!token) return next();
  try {
    const decoded = jwt.verify( token, config.jwt_access_secret! ) as { id: string; role: string; email?: string };
    const user: AuthUser = { _id: decoded.id, role: decoded.role };
    if (decoded.email !== undefined) {
      user.email = decoded.email;
    }
    req.user = user;
  } catch {
    // ignore invalid token
  }
  next();
};
