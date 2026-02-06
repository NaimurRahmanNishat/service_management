// src/utils/cookie.ts
import { Response, CookieOptions } from "express";
import config from "../config";
import { generateCsrfToken } from "./csrf";

/* ================= AUTH COOKIES ================= */
const isProduction = config.nodeEnv === "production";
const sameSiteOption: CookieOptions["sameSite"] = isProduction ? "none" : "strict";

/* ================= AUTH COOKIES ================= */
const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: sameSiteOption,
  path: "/",
};


/* ================= SET AUTH COOKIES ================= */
const setCookie = (res: Response, name: string, token: string, maxAge: number, httpOnly = true) => {
  const options: CookieOptions = { ...baseCookieOptions, httpOnly, maxAge };
  res.cookie(name, token, options);
};

/* ================= SET AUTH COOKIES ================= */
export const setAuthCookies = ( res: Response, accessToken: string, refreshToken: string ) => {
  setCookie(res, "accessToken", accessToken, 10 * 60 * 1000); // 10m
  setCookie(res, "refreshToken", refreshToken, 7 * 24 * 60 * 60 * 1000); // 7d
  // CSRF TOKEN
  const csrfToken = generateCsrfToken();
  setCookie(res, "csrfToken", csrfToken, 24 * 60 * 60 * 1000, false);
  return csrfToken;
};


/* ================= CLEAR AUTH COOKIES ================= */
export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", baseCookieOptions);
  res.clearCookie("refreshToken", baseCookieOptions);
  res.clearCookie("csrfToken", { ...baseCookieOptions, httpOnly: false });
};
