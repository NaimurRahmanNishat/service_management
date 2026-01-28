// src/modules/service/service.service.ts
import Service from "./service.model";
import Product from "../product/product.model";
import { ICreateServicePayload, ICursorPaginationOptions, IUpdateServicePayload } from "./service.interface";
import { AppError } from "../../utils/errorHandler";
import { createCursorPaginationMeta } from "../../helper/cursorPagination";
import Vendor from "../vendor/vendor.model";



/* ========================== 1. create service ========================== */
export const createService = async (payload: ICreateServicePayload,user: { _id: string; role: string }) => {
  // 🔒 Only vendor allowed
  if (user.role !== "vendor") {
    throw new AppError(403, "Only vendor can create service");
  }

  // 🔍 Find vendor profile
  const vendor = await Vendor.findOne({ user: user._id });

  if (!vendor) {
    throw new AppError(404, "Vendor profile not found");
  }

  // 🔍 Validate product
  const product = await Product.findById(payload.product);

  if (!product || !product.isActive) {
    throw new AppError(404, "Product not found or inactive");
  }

  // 🔐 Ownership check
  if (product.vendor.toString() !== vendor._id.toString()) {
    throw new AppError(403, "Unauthorized product access");
  }

  // 🚫 Prevent duplicate service
  const exists = await Service.findOne({
    product: payload.product,
    location: payload.location,
    vendor: vendor._id,
  });

  if (exists) {
    throw new AppError(409, "Service already exists for this location");
  }

  // ✅ Create service
  const service = await Service.create({
    product: payload.product,
    location: payload.location,
    rentOptions: payload.rentOptions,
    price: payload.price,
    vendor: vendor._id,
    createdBy: user._id,
  });

  return {
    success: true,
    message: "Service created successfully",
    data: service,
  };
};


/* ========================== 2. get all services ========================== */
export const getAllServices = async (payload: ICursorPaginationOptions) => {
  const {limit = 10, cursor, sortBy = "createdAt", sortOrder = "desc", search} = payload;

  const matchStage: any = {
    isActive: true,
    isAvailable: "available",
  };

  // Cursor handling (SAFE)
  if (cursor) {
    matchStage.createdAt =
      sortOrder === "desc"
        ? { $lt: new Date(cursor) }
        : { $gt: new Date(cursor) };
  }

  const pipeline: any[] = [
    { $match: matchStage },

    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "locations",
        localField: "location",
        foreignField: "_id",
        as: "location",
      },
    },
    { $unwind: { path: "$location", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "vendors",
        localField: "vendor",
        foreignField: "_id",
        as: "vendor",
      },
    },
    { $unwind: { path: "$vendor", preserveNullAndEmptyArrays: true } },
  ];

  /* SEARCH (NULL SAFE) */
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { "product.name": { $regex: search, $options: "i" } },
          { "product.description": { $regex: search, $options: "i" } },
          { "location.area": { $regex: search, $options: "i" } },
          { "location.subArea": { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  pipeline.push(
    { $sort: { createdAt: sortOrder === "asc" ? 1 : -1 } },
    { $limit: limit + 1 }
  );

  const services = await Service.aggregate(pipeline);

  const { data, meta } = createCursorPaginationMeta(
    services,
    limit,
    sortBy,
    sortOrder,
    search
  );

  return {
    success: true,
    message: "Services fetched successfully",
    data,
    meta,
  };
};


/* ========================== 3. get single service ========================== */
export const getSingleService = async (id: string) => {
  const service = await Service.findById(id)
    .populate("product")
    .populate("vendor")
    .populate("location");

  if (!service || !service.isActive) {
    throw new Error("Service not found");
  }

  return {
    success: true,
    message: "Service fetched successfully",
    data: service,
  };
};



/* ========================== 4. update service ========================== */
export const updateService = async (
  id: string,
  payload: IUpdateServicePayload
) => {
  const service = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

/* ========================== 5. delete service (soft delete) ========================== */
export const deleteService = async (id: string) => {
  const service = await Service.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

