// src/modules/product/product.controller.ts
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { catchAsync } from "../../middleware/catchAsync";
import * as productService from "./product.service";
import { sendError, sendSuccess } from "../../utils/response";
import Vendor from "../vendor/vendor.model";



/* ================= 1. CREATE PRODUCT ================= */
export const createProduct = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user!;

    const files = (req.files as { images?: Express.Multer.File[] })?.images || [];

    let vendorId: string;

    if (user.role !== "vendor") {
      if (!req.body.vendor) {
        throw new Error("Vendor is required");
      }
      const vendor = await Vendor.findById(req.body.vendor);
      if (!vendor) {
        throw new Error("Vendor not found");
      }
      vendorId = vendor._id.toString(); 
    } 
    else {
      const vendor = await Vendor.findOne({ user: user._id });
      if (!vendor) {
        throw new Error("Vendor profile not found");
      }
      vendorId = vendor._id.toString();
    }

    const result = await productService.createProduct(vendorId, req.body, files);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, "Product created successfully", result.data, 201);
  },
);
