import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { vendorRoutes } from '../modules/vendor/vendor.route';
import { serviceRoutes } from '../modules/service/service.route';
import { userRoutes } from '../modules/users/user.route';
import { homeRoutes } from '../modules/home/home.route';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { reviewRoutes } from '../modules/review/review.route';
import { notificationRoutes } from '../modules/notification/notification.route';
import { ProductRoutes } from '../modules/product/product.route';
import { locationRoutes } from '../modules/location/location.routes';

const router = Router();

// Routes for handling module-related operations
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes, // Route for handling authentication-related operations
  },
  {
    path: '/user',
    route: userRoutes,  // Route for handling user-related operations
  },
  {
    path: '/vendor',
    route: vendorRoutes,  // Route for handling vendor-related operations
  },
  {
    path: '/home',
    route: homeRoutes,  // Route for handling home-related operations
  },
  {
    path: '/product',
    route: ProductRoutes,  // Route for handling product-related operations
  },
  {
    path: '/services',
    route: serviceRoutes,  // Route for handling service-related operations
  },
  {
    path: '/review',
    route: reviewRoutes,  // Route for handling review-related operations
  },
  {
    path: '/booking',
    route: bookingRoutes,  // Route for handling booking-related operations
  },
  {
    path: '/payment',
    route: paymentRoutes,  // Route for handling payment-related operations 
  },
  {
    path: '/notification',
    route: notificationRoutes,  // Route for handling notification-related operations
  },
  {
    path: '/location',
    route: locationRoutes,  // Route for handling location-related operations
  },
];

// Add routes to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;