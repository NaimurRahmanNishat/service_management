// src/modules/review/review.route.ts
import { Router } from "express";
import { createReview, deleteReview, getReviewsByService, updateReview } from "./review.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { createReviewValidation, updateReviewValidation } from "./review.validation";
import { validate } from "../../middleware/validate.middleware";



const router = Router();

router.get( "/service/:serviceId", getReviewsByService );

router.post( "/create-review", isAuthenticated, validate(createReviewValidation), createReview );

router.patch( "/:id", isAuthenticated, validate(updateReviewValidation), updateReview );

router.delete( "/:id", isAuthenticated, deleteReview );


export const reviewRoutes = router;