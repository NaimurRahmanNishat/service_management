import { FilterQuery } from "mongoose";
import { IUser } from "../users/user.model";
import { calculateCursorPagination, createCursorPaginationMeta } from "../../helper/cursorPagination";
import Location from "./location.model";
import { ILocationTypes } from "./location.interface";


/* ================= CREATE LOCATION ================= */
export const createLocations = async ( payload: ILocationTypes, user: IUser ) => {
  // super/admin only
  if (!["admin", "super_admin"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  return await Location.create({
    ...payload,
    createdBy: user._id,
  });
};


/* ================= GET ALL (CURSOR PAGINATION) ================= */
export const getAllLocations = async ( query: any, user: IUser ) => {
  const pagination = calculateCursorPagination({
    limit: Number(query.limit),
    cursor: query.cursor,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: query.search,
    searchFields: ["division", "district", "area", "subArea"],
  });

  const filter: FilterQuery<any> = {
    ...pagination.filter,
  };

  // 🔐 Role-based filtering
  if (user.role === "vendor") {
    filter.createdBy = user._id;
  }

  if (user.role === "user") {
    filter.isActive = true;
  }

  const locations = await Location.find(filter)
    .sort({ [pagination.sortBy]: pagination.sortOrder === "asc" ? 1 : -1 })
    .limit(pagination.limit + 1)
    .populate("createdBy", "name role");

  return createCursorPaginationMeta(
    locations,
    pagination.limit,
    pagination.sortBy,
    pagination.sortOrder,
    query.search
  );
};


/* ================= GET SINGLE LOCATION ================= */
export const getLocationById = async (locationId: string, user: IUser) => {
  const location = await Location.findById(locationId);

  if (!location) throw new Error("Location not found");

  // 🔐 vendor can access only own
  if (
    user.role === "vendor" &&
    location.createdBy.toString() !== user._id!.toString()
  ) {
    throw new Error("Unauthorized");
  }

  return location;
};


/* ================= UPDATE LOCATION ================= */
export const updateLocation = async ( locationId: string, payload: Partial<any>, user: IUser ) => {
  const location = await Location.findById(locationId);
  if (!location) throw new Error("Location not found");

  if (
    user.role === "vendor" &&
    location.createdBy.toString() !== user._id!.toString()
  ) {
    throw new Error("Unauthorized");
  }

  Object.assign(location, payload);
  return await location.save();
};


/* ================= DELETE LOCATION ================= */
export const deleteLocation = async (locationId: string, user: IUser) => {
  const location = await Location.findById(locationId);
  if (!location) throw new Error("Location not found");

  if (!["admin", "super_admin"].includes(user.role)) {
    throw new Error("Only admin can delete location");
  }

  await location.deleteOne();
  return {
    success: true,
    message: "Location deleted successfully",
  };
};
