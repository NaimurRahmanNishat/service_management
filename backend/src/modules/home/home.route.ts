// src/modules/home/home.route.ts

import { Router } from 'express';
import { createHome, deleteHome, getAllHome, updateHome } from './home.controller';
import { upload } from '../../middleware/multer';



const router = Router();

// ========================= create home data =========================
router.post( "/create-home",
  upload.fields([
    { name: "heroImages", maxCount: 5 },
    { name: "basicImage", maxCount: 3 },
    { name: "standardImage", maxCount: 3 },
    { name: "premiumImage", maxCount: 3 },
  ]),
  createHome
);

// ========================= Get Home Data =========================
router.get("/", getAllHome);

// ========================= Update Home Data =========================
router.patch( "/:id",
  upload.fields([
    { name: "heroImages", maxCount: 5 },
    { name: "basicImage", maxCount: 3 },
    { name: "standardImage", maxCount: 3 },
    { name: "premiumImage", maxCount: 3 },
  ]),
  updateHome
);

// ========================= Delete Home Data =========================
router.delete("/:id", deleteHome);



export const homeRoutes = router;