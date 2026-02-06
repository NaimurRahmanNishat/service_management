// src/modules/service/service.route.ts
import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { createService, getAllServices, getSingleService, updateService, deleteService } from "./service.controller";
import { createServiceValidation, updateServiceValidation } from "./service.validation";
import { authorizeRole, isAuthenticated } from "../../middleware/auth.middleware";

const router = Router();

// ========================= 1. create service =========================
router.post( "/create-service", isAuthenticated, authorizeRole("vendor", "admin", "super_admin"), validate(createServiceValidation), createService );

// ========================= 2. get all services =========================
router.get("/", getAllServices);

// ========================= 3. get single service =========================
router.get("/:id", getSingleService);

// ========================= 4. update service =========================
router.patch(
  "/:id",
  validate(updateServiceValidation),
  updateService
);

// ========================= 5. delete service =========================
router.delete("/:id", deleteService);

export const serviceRoutes = router;
