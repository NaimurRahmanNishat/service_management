// src/utils/token.ts
import jwt from "jsonwebtoken";
import config from "../config";

export interface IAccessPayload {
  id: string;
  role: string;
}

export interface IRefreshPayload {
  id: string;
}

// Access token (10 minutes)
export const generateAccessToken = (payload: IAccessPayload): string => {
  const secret = config.jwt_access_secret;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  const expiresIn = config.access_token_expires || "10m";
  return jwt.sign(payload, secret, { expiresIn } as any);
};

// Refresh token (7 days)
export const generateRefreshToken = (payload: IRefreshPayload): string => {
  const secret = config.refresh_token_secret;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  const expiresIn = config.refresh_token_expires || "7d";
  return jwt.sign(payload, secret, { expiresIn } as any);
};

export const verifyRefreshToken = (token: string): IRefreshPayload => {
  const secret = config.refresh_token_secret;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  return jwt.verify(token, secret) as IRefreshPayload;
};

