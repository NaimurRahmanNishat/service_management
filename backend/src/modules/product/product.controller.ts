// src/modules/product/product.controller.ts
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { catchAsync } from "../../middleware/catchAsync";
import * as productService from "./product.service";
import { sendError, sendSuccess } from "../../utils/response";



/* ================= 1. CREATE PRODUCT ================= */
export const createProduct = catchAsync(async (req: AuthRequest, res: Response) => {
    const user = req.user!;

    const files = (req.files as { images?: Express.Multer.File[] })?.images || [];

    let vendorId = user._id.toString();

    if (user.role !== "vendor") {
      if (!req.body.vendor) {
        throw new Error("Vendor is required");
      }
      vendorId = req.body.vendor;
    }

    const result = await productService.createProduct(vendorId, req.body, files);
    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, "Product created successfully", result.data, 201);
  },
);
