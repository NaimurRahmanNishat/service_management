// src/modules/stats/stats.route.ts
import { Router } from "express";
import { adminStatsController, superAdminStatsController, userStatsController, vendorStatsController } from "./stats.controller";
import { authorizeRole, isAuthenticated } from "../../middleware/auth.middleware";


const router = Router();

/* ================= GET SUPER ADMIN STATS ================= */
router.get("/super-admin", isAuthenticated, authorizeRole("super_admin"), superAdminStatsController);

/* ================= GET ADMIN STATS ================= */
router.get("/admin", isAuthenticated, authorizeRole("admin"), adminStatsController);

/* ================= GET VENDOR STATS ================= */
router.get("/vendor", isAuthenticated, authorizeRole("vendor"), vendorStatsController);

/* ================= GET USER STATS ================= */
router.get("/user", isAuthenticated, authorizeRole("user"), userStatsController);

export const statsRoutes = router;