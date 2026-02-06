// src/modules/home/home.route.ts
import { Router } from 'express';
import { createHome, deleteHome, getAllHome, updateHome } from './home.controller';
import { upload } from '../../middleware/multer';
import { authorizeRole, isAuthenticated } from '../../middleware/auth.middleware';



const router = Router();

/* ================= CREATE HOME ================= */
router.post( "/create-home",
  upload.fields([
    { name: "heroImages", maxCount: 5 },
    { name: "basicImage", maxCount: 3 },
    { name: "standardImage", maxCount: 3 },
    { name: "premiumImage", maxCount: 3 },
  ]),
  isAuthenticated,
  authorizeRole("admin", "super_admin"),
  createHome
);

/* ================= GET ALL HOMES ================= */
router.get("/", getAllHome);

/* ================= UPDATE HOME ================= */
router.patch( "/:id",
  upload.fields([
    { name: "heroImages", maxCount: 5 },
    { name: "basicImage", maxCount: 3 },
    { name: "standardImage", maxCount: 3 },
    { name: "premiumImage", maxCount: 3 },
  ]),
  isAuthenticated,
  authorizeRole("admin", "super_admin"),
  updateHome
);

/* ================= DELETE HOME ================= */
router.delete("/:id", isAuthenticated, authorizeRole("admin", "super_admin"), deleteHome);

export const homeRoutes = router;
