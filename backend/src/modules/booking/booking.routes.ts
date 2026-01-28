// src/modules/booking/booking.routes.ts

import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { createBooking } from "./booking.controller";
// import { createBooking, getAllBookings, getUserBookings, getVendorBookings, getSingleBooking, confirmBooking, cancelBooking, completeBooking, updateBookingStatus, } from "./booking.controller";
// import { validate } from "../../middleware/validate.middleware";
// import { createBookingSchema, cancelBookingSchema, updateStatusSchema, getBookingsQuerySchema, } from "./booking.validation";
// import { authorizeRole, isAuthenticated } from "../../middleware/auth.middleware";


const router = Router();

// /* ========================================== PROTECTED ROUTES ========================================== */

// // All booking routes require authentication
// router.use(isAuthenticated);

// ========================= 1. Create booking =========================
router.post("/create-booking", isAuthenticated, createBooking );

// // ========================= 2. Get user's bookings =========================
// router.get( "/my-bookings", validate(getBookingsQuerySchema), getUserBookings );

// // ========================= 3. Get vendor's bookings (vendor, admin, super_admin) =========================
// router.get( "/vendor-bookings", authorizeRole("vendor", "admin", "super_admin"), validate(getBookingsQuerySchema), getVendorBookings );

// // ========================= 4. Get all bookings (admin, super_admin) =========================
// router.get( "/", authorizeRole("admin", "super_admin"), validate(getBookingsQuerySchema), getAllBookings );

// // ========================= 5. Get single booking =========================
// router.get("/:id", getSingleBooking);

// // ========================= 6. Confirm booking (vendor, admin, super_admin) =========================
// router.patch( "/:id/confirm", authorizeRole("vendor", "admin", "super_admin"), confirmBooking );

// // ========================= 7. Cancel booking =========================
// router.patch( "/:id/cancel", validate(cancelBookingSchema), cancelBooking );

// // ========================= 8. Complete booking (vendor, admin, super_admin) =========================
// router.patch( "/:id/complete", authorizeRole("vendor", "admin", "super_admin"), completeBooking );

// // ========================= 9. Update booking status (admin, super_admin) =========================
// router.patch( "/:id/status", authorizeRole("admin", "super_admin"), validate(updateStatusSchema), updateBookingStatus );

export const bookingRoutes = router;
