// src/modules/users/user.services.ts
import sharp from "sharp";
import { calculateCursorPagination, createCursorPaginationMeta } from "../../helper/cursorPagination";
import { deleteFromCloudinary, uploadToCloudinary } from "../../helper/uploadToCloudinary";
import Booking from "../booking/booking.model";
import { GetUsersPayload, IUserType } from "./user.interface";
import User from "./user.model";
import { findUserById } from "./user.repository";



/* ================= GET ME ================= */
export const getMeService = async (userId: string) => {
    const user = await findUserById(userId);
    if (!user) {
        return { success: false, message: "User not found", data: null };
    }
    return { success: true, message: "User found", data: user };
};


/* ================= UPDATE PROFILE ================= */
export const updateProfileService = async (userId: string, payload: IUserType, file?: Express.Multer.File) => {
  const user = await findUserById(userId);

  if (!user) {
    return { success: false, message: "User not found", data: null };
  }

  /* ---------------- EMAIL CHECK ---------------- */
  if (payload.email && payload.email !== user.email) {
    const emailExists = await User.exists({
      email: payload.email,
      _id: { $ne: userId },
    });

    if (emailExists) {
      return {
        success: false,
        message: "Email already in use",
        data: null,
      };
    }

    user.email = payload.email;
  }

  /* ---------------- AVATAR UPDATE (SINGLE IMAGE) ---------------- */
  if (file) {
    // delete old avatar (if exists)
    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    // compress image
    const buffer = await sharp(file.buffer)
      .resize({ width: 1200 })
      .webp({ quality: 70 })
      .toBuffer();

    // upload
    const uploaded = await uploadToCloudinary(buffer, "users/avatar");

    // save new avatar
    user.avatar = {
      public_id: uploaded.public_id,
      url: uploaded.secure_url,
    };
  }

  /* ---------------- SIMPLE FIELDS UPDATE ---------------- */
  if (payload.name !== undefined) {
    user.name = payload.name;
  }

  if (payload.phone !== undefined) {
    user.phone = payload.phone;
  }

  /* ---------------- ADDRESS (SAFE MERGE) ---------------- */
  if (payload.address) {
    user.address = {
      ...(user.address || {}),
      ...payload.address,
    };
  }

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;

  return {
    success: true,
    message: "User updated successfully",
    data: userObj,
  };
};


/* ================= GET ALL USERS ================= */
export const getAllUsersService = async ( userId: string, payload: GetUsersPayload ) => {
  const requester = await User.findById(userId).select("role").lean();

  if (!requester) {
    return { success: false, message: "Unauthorized", data: null };
  }

  // PAGINATION OPTIONS FOR CURSOR PAGINATION
  const paginationOptions = {
    ...(payload.limit && { limit: payload.limit }),
    ...(payload.cursor && { cursor: payload.cursor }),
    ...(payload.sortBy && { sortBy: payload.sortBy }),
    ...(payload.sortOrder && { sortOrder: payload.sortOrder }),
    ...(payload.search && { search: payload.search }),
    searchFields: ["name", "email"],
  };

  const { limit, sortBy, sortOrder, filter } =
    calculateCursorPagination(paginationOptions);

  // ROLE VISIBILITY CONDITION
  let roleCondition: any = {};

  if (requester.role === "super_admin") {
    roleCondition = payload.role ? { role: payload.role } : {};
  }

  if (requester.role === "admin") {
    roleCondition = {
      role: payload.role
        ? payload.role
        : { $in: ["vendor", "user"] },
    };
  }

  // SUPER ADMIN / ADMIN LOGIC
  if (requester.role === "super_admin" || requester.role === "admin") {
    const users = await User.find({
      ...filter,
      ...roleCondition,
    })
      .select("-password -refreshToken -refreshTokenExpiry")
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit + 1)
      .lean();

    const { data, meta } = createCursorPaginationMeta(
      users,
      limit,
      sortBy,
      sortOrder,
      payload.search
    );

    return {
      success: true,
      message: "Users fetched successfully",
      data,
      meta,
    };
  }

  // VENDOR LOGIC
  if (requester.role === "vendor") {
    const userIds = await Booking.distinct("user", { vendor: userId });

    if (!userIds.length) {
      return {
        success: true,
        message: "No assigned users found",
        data: [],
        meta: {
          limit,
          hasMore: false,
          nextCursor: null,
          sortBy,
          sortOrder,
        },
      };
    }

    const users = await User.find({
      _id: { $in: userIds },
      ...filter,
    })
      .select("-password -refreshToken -refreshTokenExpiry")
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit + 1)
      .lean();

    const { data, meta } = createCursorPaginationMeta(
      users,
      limit,
      sortBy,
      sortOrder,
      payload.search
    );

    return {
      success: true,
      message: "Assigned users fetched successfully",
      data,
      meta,
    };
  }

  return {
    success: false,
    message: "Access denied",
    data: null,
  };
};



/* ================= DELETE USER ================= */
export const deleteUserService = async (userId: string) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return { success: false, message: "User not found", data: null };
    }
    return { success: true, message: "User deleted successfully" };
}
