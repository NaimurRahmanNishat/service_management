// src/modules/payment/payment.routes.ts

import { Router } from "express";
import { confirmStripePayment, makeStripePayment } from "./payment.controller";

const router = Router();

// ========================= 1. make stripe payment =============================
router.post("/create-checkout-session", makeStripePayment);

// ========================= 2. confirm stripe payment ============================= 
router.post("/confirm-stripe-payment",  confirmStripePayment);

export const paymentRoutes = router;
