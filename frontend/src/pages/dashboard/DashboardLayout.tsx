import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "@/redux/store";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import VendorDashboard from "./VendorDashboard";
import { ToastContainer } from "react-toastify";
import DashboardHeader from "@/components/dashboardHeader/DashboardHeader";
import SuperAdminDashboard from "./SuperAdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    alert("You must be logged in to view this page.");
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "user":
        return <UserDashboard />;
      case "super_admin":
        return <SuperAdminDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-2/5 hidden md:block w-full md:h-screen sticky top-0 overflow-y-auto border-r bg-white shadow-md z-10">
        {renderDashboard()}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-slate-100">
        {/* Header (non-sticky) */}
        <div className="w-full mt-4 sticky top-0 z-10">
          <DashboardHeader />
        </div>

        {/* Scrollable Outlet Area */}
        <div className="flex-1 overflow-y-auto p-4 md:mx-8 hidden md:block">
          <Outlet />
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
