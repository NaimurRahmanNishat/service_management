// src/modules/auth/auth.service.ts
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/token";
import User, { IUser } from "../users/user.model";
import { findUserByEmail, findUserById, findUserByLogin, findUserForRefreshToken, saveUser, updateRefreshToken } from "../users/user.repository";
import bcrypt from "bcrypt";
import { RegisterUserData } from "./auth.interface";
import { AuthUser } from "../../middleware/auth.middleware";
import { sendEmail } from "../../utils/email";
import { generateOTP, hashOTP, verifyOTP } from "../../utils/otp";
import { redis } from "../../config/redis";
import { ServiceResponse } from "../../@types/api";
import Vendor from "../vendor/vendor.model";


/* ================= REGISTER USER ================= */
export const registerUser = async ( userData: RegisterUserData, currentUser?: AuthUser ) => {
  try {
    const { name, email, password, confirmPassword, phone, role } = userData;

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return { success: false, message: "User already exists" };
    }

    const count = await User.estimatedDocumentCount();
    let finalRole: IUser["role"] = "user";

    if (count === 0) {
      finalRole = "super_admin";
    } else if (currentUser) {
      if (currentUser.role === "super_admin" && role === "admin") {
        finalRole = "admin";
      } else if (currentUser.role === "admin" && role === "vendor") {
        finalRole = "vendor";
      } else if (role && role !== "user") {
        return { success: false, message: "Not authorized" };
      }
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: finalRole,
      isVerified: false,
    });

    /* =================== AUTO CREATE VENDOR PROFILE =================== */
    if (finalRole === "vendor") {
      await Vendor.create({
        user: user._id,
        shopName: `${name}'s Shop`,
        locations: [],
        assignedProducts: [],
        balance: 0,
        pendingBalance: 0,
        totalEarnings: 0,
        isApproved: false, // admin approve later
        createdBy: currentUser?._id || user._id,
      });
    }

    // OTP logic (unchanged)
    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    await redis.set(`otp:${user._id}`, hashedOTP, "EX", 300);
    await redis.set(`otp_attempt:${user._id}`, 0, "EX", 300);

    await sendEmail(email, "Activate Account", "activation", {
      name,
      email,
      activationCode: otp,
      clientUrl: process.env.CLIENT_URL,
    });

    return {
      success: true,
      message: "Registration successful",
      data: { message: "Check email for activation code" },
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Registration failed",
      errors: [error.message],
    };
  }
};


/* ================= RESEND ACTIVATION USER ================= */
export const resendActivationUser = async (userData: { email: string }) => {
  try {
    const { email } = userData;

    // ✅ FIX: find by email
    const user = await User.findOne({ email }).select("name email isVerified");
    if (!user) {
      return {
        success: false,
        message: "User not found",
        errors: ["User not found"],
      };
    }

    if (user.isVerified) {
      return {
        success: false,
        message: "Account already activated",
        errors: ["Account already activated"],
      };
    }

    const userId = user._id!.toString();

    const attempts = Number(await redis.get(`otp_attempt:${userId}`)) || 0;

    if (attempts >= 5) {
      return {
        success: false,
        message: "Too many OTP requests. Please try again later.",
        errors: ["OTP request limit exceeded"],
      };
    }

    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    await redis.set(`otp:${userId}`, hashedOTP, "EX", 600); // 10 min
    await redis.incr(`otp_attempt:${userId}`);

    await sendEmail(
      email,
      "New Activation Code - Email Verification",
      "activation",
      {
        name: user.name,
        activationCode: otp,
        email,
        clientUrl: process.env.CLIENT_URL,
      }
    );

    return {
      success: true,
      message: "Activation code resent successfully",
      data: {
        message: "Please check your email to verify your account",
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Resend activation failed",
      errors: [error.message],
    };
  }
};


/* ================= ACTIVATE USER ================= */
export const activateUser = async (userData: { email: string; otp: string }) => {
  try {
    const { email, otp } = userData;

    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: "User not found",
        errors: ["No account found with this email"],
      };
    }

    if (user.isVerified) {
      return {
        success: false,
        message: "Already activated",
        errors: ["This account is already activated"],
      };
    }

    const userId = user._id!.toString();

    const storedOTP = await redis.get(`otp:${userId}`);
    if (!storedOTP) {
      return {
        success: false,
        message: "OTP expired",
        errors: ["The OTP has expired. Please request a new one."],
      };
    }

    const isValid = await verifyOTP(otp, storedOTP);
    if (!isValid) {
      const attempts = await redis.incr(`otp_attempt:${userId}`);

      // optional brute-force protection
      if (attempts >= 5) {
        await redis.del(`otp:${userId}`);
        return {
          success: false,
          message: "Too many attempts",
          errors: ["OTP attempts exceeded. Please request a new OTP."],
        };
      }

      return {
        success: false,
        message: "Invalid OTP",
        errors: ["The provided OTP is incorrect"],
      };
    }
    user.isVerified = true;
    await user.save();

    await redis.del(`otp:${userId}`);
    await redis.del(`otp_attempt:${userId}`);

    return {
      success: true,
      message: "Account activated",
      data: {
        message: "Your account has been activated. You can now log in.",
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Activation failed",
      errors: [error.message],
    };
  }
};


/* ================= LOGIN USER ================= */
export const loginUser = async (userData: { email: string; password: string }) => {
  const user = await findUserByLogin(userData.email);

  if (!user || !(await bcrypt.compare(userData.password, user.password))) {
    return {
      success: false,
      message: "Invalid credentials",
      errors: ["Invalid email or password"],
    };
  }

  if (!user.isVerified || !user.isActive) {
    return {
      success: false,
      message: "User not verified or inactive",
      errors: ["Please verify your email or contact support"],
    };
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id });

  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await updateRefreshToken(user, refreshToken, expiry);

  const userWithoutPassword = user.toObject();
  userWithoutPassword.password = undefined;

  return {
    success: true,
    message: "Login successful",
    data: {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    },
  };
};


/* ================= REFRESH ACCESS TOKEN ================= */
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await findUserForRefreshToken(decoded.id);
    if (!user || !user.refreshTokenExpiry || user.refreshTokenExpiry < new Date() || !(await user.compareRefreshToken(refreshToken))) {
      return {
        success: false,
        message: "Invalid refresh token",
        errors: ["Invalid refresh token"],
      };
    }

    const accessToken = generateAccessToken({ id: user._id!.toString(), role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user._id!.toString() });

    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await updateRefreshToken(user, newRefreshToken, expiry);

    return {
      success: true,
      message: "Token refreshed",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Refresh token failed",
      errors: [error.message],
    };
  }
};


/* ================= SOCIAL AUTH ================= */
export const socialAuth = async (email: string, name: string, avatar?: string ): Promise<ServiceResponse<{ user: IUser; accessToken: string; refreshToken: string }>> => {
  try {
    if (!email || !name) {
      return {
        success: false,
        message: "Email and name are required for social authentication",
        errors: ["Missing required fields"]
      };
    }

    let user = await findUserByEmail(email);
    if (!user) {
      console.log(`Creating new user for social auth: ${email}`);
      const newUser = new User({ 
        email, 
        name, 
        role: "user", 
        isVerified: true,
        password: await bcrypt.hash(email, 10)
      });
      
      if (avatar) {
        newUser.avatar = {
          public_id: `google_${email}`,
          url: avatar
        };
      }
      
      user = await saveUser(newUser);
      console.log(`✅ New user created: ${user._id}`);
    } else {
      console.log(`✅ Existing user found: ${user._id}`);
      
      // Avatar update if needed
      if (avatar && avatar !== user.avatar?.url) {
        user.avatar = {
          public_id: user.avatar?.public_id || `google_${email}`,
          url: avatar
        };
        await user.save();
      }
    }

    const accessToken = generateAccessToken({ id: user._id!.toString(), role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id!.toString()});

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    console.log(`✅ Social auth successful for: ${email}`);

    return {
      success: true,
      data: { user: userWithoutPassword, accessToken, refreshToken },
      message: "Social authentication successful"
    };
  } catch (error: any) {
    console.error("Social authentication error:", error);
    return {
      success: false,
      message: "Social authentication failed",
      errors: [error.message || "Unknown error"]
    };
  }
};


/* ================= LOGOUT USER ================= */
export const logoutUser = async (userId: string): Promise<ServiceResponse<null>> => {
  try {
    const user = await findUserById(userId);
    if (user) {
      user.refreshToken = null;
      user.refreshTokenExpiry = null;
      await saveUser(user);
    }    
    return {
      success: true,
      data: null,
      message: "Logout successful"
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Logout failed",
      errors: [error.message]
    };
  }
};
