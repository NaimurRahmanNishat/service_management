// src/modules/payment/payment.routes.ts

import { Router } from "express";
import { confirmStripePayment, makeStripePayment } from "./payment.controller";

const router = Router();

/* ================= CREATE STRIPE CHECKOUT SESSION ================= */
router.post("/create-checkout-session", makeStripePayment);

/* ================= CONFIRM STRIPE PAYMENT ================= */
router.post("/confirm-stripe-payment",  confirmStripePayment);

export const paymentRoutes = router;
