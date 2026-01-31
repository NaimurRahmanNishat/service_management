// src/middleware/csrf.middleware.ts
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";


/* ================= CSRF PROTECTION ================= */
export const csrfProtection = ( req: Request, res: Response, next: NextFunction ) => {
  const csrfCookie = req.cookies?.csrfToken;
  const csrfHeader = req.headers["x-csrf-token"];

  if (!csrfCookie || typeof csrfHeader !== "string") {
    return res.status(403).json({
      success: false,
      message: "CSRF token missing",
    });
  }

  // timing safe compare
  const cookieBuffer = Buffer.from(csrfCookie);
  const headerBuffer = Buffer.from(csrfHeader);

  if (
    cookieBuffer.length !== headerBuffer.length ||
    !crypto.timingSafeEqual(cookieBuffer, headerBuffer)
  ) {
    return res.status(403).json({
      success: false,
      message: "Invalid CSRF token",
    });
  }
  next();
};








// // src/middleware/csrf.middleware.ts
// import { Request, Response, NextFunction } from "express";
// import config from "../config";

// const TRUSTED_ORIGINS = [
//   "http://localhost:3000",
//   "http://localhost:5173",
//   "https://yourdomain.com",
// ];

// export const csrfProtection = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // 🟡 Skip CSRF for safe methods
//   if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
//     return next();
//   }

//   const csrfCookie = req.cookies?.csrfToken;
//   const csrfHeader = req.headers["x-csrf-token"];

//   // ✅ Type safety
//   if (
//     typeof csrfCookie !== "string" ||
//     typeof csrfHeader !== "string"
//   ) {
//     return res.status(403).json({
//       success: false,
//       message: "CSRF token missing",
//     });
//   }

//   // 🔐 Token match check
//   if (csrfCookie !== csrfHeader) {
//     return res.status(403).json({
//       success: false,
//       message: "Invalid CSRF token",
//     });
//   }

//   // 🌐 Origin validation (extra layer)
//   const origin = req.headers.origin || req.headers.referer;

//   if (config.nodeEnv === "production" && origin) {
//     const isTrusted = TRUSTED_ORIGINS.some((o) =>
//       origin.startsWith(o)
//     );

//     if (!isTrusted) {
//       return res.status(403).json({
//         success: false,
//         message: "Untrusted origin",
//       });
//     }
//   }

//   next();
// };