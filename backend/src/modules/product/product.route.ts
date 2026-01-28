import { Router } from "express";
import * as controller from "./product.controller";
import { upload } from "../../middleware/multer";
import { authorizeRole, isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createProductSchema } from "./product.validation";




const router = Router();

/* ================= 1. CREATE PRODUCT ================= */
router.post("/create-product", upload.fields([{ name: "images", maxCount: 4 }]), isAuthenticated, authorizeRole("admin", "super_admin"), validate(createProductSchema), controller.createProduct);



export const ProductRoutes = router;