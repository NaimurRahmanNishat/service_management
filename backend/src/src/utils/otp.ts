// src/utils/otp.ts
import bcrypt from "bcrypt";

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const hashOTP = async (otp: string) =>
  bcrypt.hash(otp, 10);

export const verifyOTP = async (otp: string, hash: string) =>
  bcrypt.compare(otp, hash);
