// utils/uploadToCloudinary.ts

import cloudinary from "../config/cloudinary";


// ============================== Upload to Cloudinary ==============================
export const uploadToCloudinary = (buffer: Buffer, folder: string) =>
  new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    ).end(buffer);
  });


// ============================== Delete from Cloudinary (Single) ==============================
export const deleteFromCloudinary = (publicId: string) =>
  new Promise<any>((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });


// ============================== Delete from Cloudinary (Multiple) ==============================
export const deleteImagesFromCloudinary = async (images: any[]): Promise<{ success: number; failed: number; errors: string[] }> => {
  let successCount = 0;
  let failedCount = 0;
  const errors: string[] = [];

  if (!images || !Array.isArray(images) || images.length === 0) {
    return { success: 0, failed: 0, errors: [] };
  }

  for (const img of images) {
    if (!img?.public_id) {
      continue;
    }

    try {
      await deleteFromCloudinary(img.public_id);
      successCount++;
    } catch (error: any) {
      failedCount++;
      const errorMsg = `Failed to delete ${img.public_id}: ${error.message}`;
      errors.push(errorMsg);
      console.error(`  ❌ ${errorMsg}`);
    }
  }

  return { success: successCount, failed: failedCount, errors };
};