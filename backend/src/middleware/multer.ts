// src/middleware/multer.ts

import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = ( req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback ) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"));
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per image
});





// Client (FormData)
//    ↓
// multer.fields([{ name: "images", maxCount: 4 }])
//    ↓
// req.files.images (array)
//    ↓
// sharp (loop)
//    ↓
// cloudinary (Promise.all)
//    ↓
// Service.images[] save
