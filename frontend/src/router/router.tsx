import App from "@/App";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import UserDashboardMain from "@/pages/dashboard/user/dashboard/UserDashboardMain";
import ErrorPage from "@/components/shared/Error";
import MyBookings from "@/pages/dashboard/user/my-bookings/MyBookings";
import PaymentHistory from "@/pages/dashboard/user/payment-history/PaymentHistory";
import Reviews from "@/pages/dashboard/user/reviews/Reviews";
import ProfileSettings from "@/pages/dashboard/role-page/profile-settings/ProfileSettings";
import Support from "@/pages/dashboard/user/support/Support";
import AdminDashboardMain from "@/pages/dashboard/admin/AdminDashboardMain";
import VendorDashboardMain from "@/pages/dashboard/vendor/VendorDashboardMain";
import UserManagement from "@/pages/dashboard/role-page/user-management/UserManagement";
import CommissionAndPayment from "@/pages/dashboard/role-page/commission/CommissionAndPayment";
import Earnings from "@/pages/dashboard/role-page/earnings/Earnings";
import VendorServiceManagement from "@/pages/dashboard/role-page/service-management/ServiceManagement";
import ActivationUser from "@/pages/register/ActivationUser";
import BookingManagement from "@/pages/dashboard/role-page/booking-management/BookingManagement";
import VendorManagement from "@/pages/dashboard/role-page/vendor-management/VendorManagement";
import Reports from "@/pages/dashboard/role-page/reports/Reports";
import AdminManagement from "@/pages/dashboard/super-admin/admin-management/AdminManagement";
import Services from "@/pages/services/Services";
import Health from "@/pages/health/Health";
import LifeStyle from "@/pages/lifestyle/LifeStyle";
import Technology from "@/pages/technology/Technology";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import SuperAdminDashboardMain from "@/pages/dashboard/super-admin/SuperAdminDashboardMain";
import Fitness from "@/pages/fitness/Fitness";
import ServiceDetails from "@/pages/[id]/ServiceDetails";
import House from "@/pages/house/House";
import Land from "@/pages/land/Land";
import Vehicle from "@/pages/vehicle/Vehicle";
import Others from "@/pages/others/Others";
import Payment from "@/pages/payment/Payment";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/health",
        element: <Health />,
      },
      {
        path: "/lifestyle",
        element: <LifeStyle />,
      },
      {
        path: "/technology",
        element: <Technology />,
      },
      {
        path: "/house",
        element: <House />,
      },
      {
        path: "/land",
        element: <Land />,
      },
      {
        path: "/fitness",
        element: <Fitness />,
      },
      {
        path: "/vehicle",
        element: <Vehicle />,
      },
      {
        path: "/others",
        element: <Others />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/cancel",
        element: <div>Payment Cancelled</div>,
      },
      {
        path: "/payment/:bookingId",
        element: <Payment />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      }
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/activation",
    element: <ActivationUser />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard", // parents absolute path
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // user routes
      {
        path: "user", // children relative path
        element: <UserDashboardMain />,
      },
      {
        path: "my-bookings", // children relative path
        element: <MyBookings />,
      },
      {
        path: "payment-history", // children relative path
        element: <PaymentHistory />,
      },
      {
        path: "support", // children relative path 
        element: <Support />,
      },

      // vendor route
      {
        path: "vendor", // children relative path
        element: (
          <ProtectedRoute role="vendor">
            <VendorDashboardMain />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-management", // children relative path
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "service-management", // children relative path (access vendor, admin, super-admin)
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <VendorServiceManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking-management", // children relative path (access vendor, admin, super-admin)
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <BookingManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "earnings", // children relative path (access vendor, admin, super-admin)
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <Earnings />
          </ProtectedRoute>
        ),
      },
      {
        path: "reviews", // children relative path (access vendor, admin, super-admin)
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <Reviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "reports", // children relative path (access vendor, admin, super-admin)
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: "commission", // children relative path (access admin, super-admin) 
        element: (
          <ProtectedRoute role={["vendor", "admin", "super_admin"]}>
            <CommissionAndPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile", // children relative path
        element: (
          <ProtectedRoute role={["user", "vendor", "admin", "super_admin"]}>
            <ProfileSettings />
          </ProtectedRoute>
        ),
      },

      // admin routes
      {
        path: "admin", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboardMain />
          </ProtectedRoute>
        ),
      },
      {
        path: "vendor-management", // children relative path (access admin, super-admin)
        element: (
          <ProtectedRoute role={["admin", "super_admin"]}>
            <VendorManagement />
          </ProtectedRoute>
        ),
      },

      // super-admin routes
      {
        path: "super-admin", // children relative path
        element: (
          <ProtectedRoute role="super_admin">
            <SuperAdminDashboardMain />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-management", // children relative path
        element: (
          <ProtectedRoute role="super_admin">
            <AdminManagement />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
