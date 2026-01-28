import { Router } from "express";
import * as controller from "./location.controller";
import { authorizeRole, isAuthenticated } from "../../middleware/auth.middleware";
import { createLocation } from "./location.controller";
import { validate } from "../../middleware/validate.middleware";
import { createLocationSchema } from "./location.validation";

const router = Router();

router.post("/create-location", isAuthenticated, authorizeRole("admin", "super_admin"), validate(createLocationSchema), createLocation);
// router.get("/", isAuthenticated, controller.getAllLocations);
// router.get("/:id", isAuthenticated, controller.getLocation);
// router.patch("/:id", isAuthenticated, controller.updateLocation);
// router.delete("/:id", isAuthenticated, controller.deleteLocation);

export const locationRoutes = router;
