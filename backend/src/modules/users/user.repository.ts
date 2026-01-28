// src/modules/users/user.repository.ts
import { ClientSession } from "mongoose"
import User, { IUser } from "./user.model"
import { AuthRequest } from "../../middleware/auth.middleware"
import bcrypt from "bcrypt";


// find user by email
export const findUserByEmail = (email: string):Promise<IUser | null> => {
  return User.findOne({ email })
}

// find user for activation
export const findUserForActivation = (email: string):Promise<IUser | null> => {
  return User.findOne({ email }).select("+activationCode +activationCodeExpiry")
}

// find user by login
export const findUserByLogin = (email: string):Promise<IUser | null> => {
    return User.findOne({ email }).select("+password")
}

// write save operation
export const saveUser = (user: IUser, session?: ClientSession):Promise<IUser> => {
  return user.save({ session: session ?? null });
};

// update refresh token
export const updateRefreshToken = async ( user: IUser, refreshToken: string, expiry: Date ): Promise<IUser> => {
  const hash = await bcrypt.hash(refreshToken, 12);
  user.refreshToken = hash;
  user.refreshTokenExpiry = expiry;
  return user.save();
};

// find user for refresh token
export const findUserForRefreshToken = (userId: string): Promise<IUser | null> => {
  return User.findById(userId).select("+refreshToken +refreshTokenExpiry");
};

// find user by id
export const findUserById = (userId: string): Promise<IUser | null> => {
  return User.findById(userId).select("-password");
};


// get user id from auth request
export const getUserId = (req: AuthRequest): string => {
  if (!req.user || !req.user._id) {
    throw new Error('User not authenticated or ID missing from token');
  }
  return req.user._id.toString();
};

