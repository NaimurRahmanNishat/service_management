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


/* ================= GENERATE ACCESS TOKEN ================= */
export const generateAccessToken = (payload: IAccessPayload): string => {
  const secret = config.jwt_access_secret;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  const expiresIn = config.access_token_expires || "10m";
  return jwt.sign(payload, secret, { expiresIn } as any);
};


/* ================= GENERATE REFRESH TOKEN ================= */
export const generateRefreshToken = (payload: IRefreshPayload): string => {
  const secret = config.refresh_token_secret;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  const expiresIn = config.refresh_token_expires || "7d";
  return jwt.sign(payload, secret, { expiresIn } as any);
};


/* ================= VERIFY REFRESH TOKEN ================= */
export const verifyRefreshToken = (token: string): IRefreshPayload => {
  const secret = config.refresh_token_secret;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  return jwt.verify(token, secret) as IRefreshPayload;
};

