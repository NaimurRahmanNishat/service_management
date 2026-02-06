// src/modules/users/user.route.ts
import { Router } from "express";
import { deleteController, getAllUsersController, getmeController, updateProfileController } from "./user.controller";
import { authorizeRole, isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { updateUserSchema } from "./user.validation";
import { upload } from "../../middleware/multer";


const router = Router();

/* ================= GET ME ================= */
router.get("/me", isAuthenticated, getmeController);

/* ================= UPDATE PROFILE ================= */
router.patch("/update-profile", isAuthenticated, upload.single("image"), validate(updateUserSchema), updateProfileController );

/* ================= GET ALL USERS ================= */
router.get("/all-users", isAuthenticated, authorizeRole("vendor", "admin", "super_admin"), getAllUsersController);

/* ================= DELETE USER ================= */
router.delete("/:id", isAuthenticated, deleteController);

export const userRoutes = router; 
