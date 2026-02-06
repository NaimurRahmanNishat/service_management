// src/modules/product/product.service.ts
import sharp from "sharp";
import Product from "./product.model";
import { uploadToCloudinary } from "../../helper/uploadToCloudinary";
import { CreateProductPayload } from "./product.interface";



/* ================= 1. CREATE PRODUCT ================= */
export const createProduct = async ( vendorId: string, payload: CreateProductPayload, files: Express.Multer.File[] ) => {

  const { name, description, category, quantity, location, adminCommission } = payload;

  /* ================= IMAGE VALIDATION ================= */
  if (!files || files.length === 0) {
    return {
      success: false,
      message: "Product images are required",
    };
  }

  if (files.length > 4) {
    throw new Error("Maximum 4 images allowed");
  }

  /* ================= IMAGE PROCESS ================= */
  const compressedBuffers = await Promise.all(
    files.map((file) =>
      sharp(file.buffer)
        .resize({ width: 1200 })
        .webp({ quality: 70 })
        .toBuffer(),
    ),
  );

  const uploadedImages = await Promise.all(
    compressedBuffers.map((buffer) =>
      uploadToCloudinary(buffer, "products/images"),
    ),
  );

  const images = uploadedImages.map((img) => ({
    public_id: img.public_id,
    url: img.secure_url,
  }));

  /* ================= COMMISSION LOGIC ================= */
  const platformCommission = 5;

  const admin = Number(adminCommission);
  if (isNaN(admin)) {
    throw new Error("Admin commission must be a number");
  }

  const vendor = 100 - (platformCommission + admin);

  if (vendor < 0) {
    throw new Error("Invalid commission configuration");
  }

  /* ================= CREATE PRODUCT ================= */
  const product = await Product.create({
    name,
    description,
    category,
    quantity,
    vendor: vendorId,
    location,
    images,
    commission: {
      platform: platformCommission,
      admin,
      vendor,
    },
  });

  return { success: true, data: product, message: "Product created successfully" };
};
