/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navItems = [
  {
    path: "/dashboard/super-admin",
    label: "Dashboard",
  },
  {
    path: "/dashboard/user-management", // children relative path
    label: "User Management",
  },
  {
    path: "/dashboard/vendor-management", // children relative path
    label: "Vendor Management",
  },
  {
    path: "/dashboard/admin-management", // children relative path
    label: "Admin Management",
  },
  {
    path: "/dashboard/service-management", // children relative path
    label: "Service Management",
  },
  {
    path: "/dashboard/booking-management", // children relative path
    label: "Booking Management",
  },
  {
    path: "/dashboard/earnings", // children relative path
    label: "Earnings & Withdrawals",
  },
  {
    path: "/dashboard/commission", // children relative path
    label: "Commission & Payment",
  },
  {
    path: "/dashboard/reviews", // children relative path
    label: "Reviews & Ratings",
  },
  {
    path: "/dashboard/reports", // children relative path
    label: "Reports",
  },
  {
    path: "/dashboard/profile", // children relative path
    label: "Profile & Settings",
  },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [logoutUser] = useUserLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res?.success) {
        dispatch(logout());
        toast.success(res.message || "Logout successful!", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Logout failed. Please try again!");
      }
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error?.data?.message || "Failed to logout!");
    }
  };
  return (
    <div className="bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="text-2xl font-extrabold text-[#0f172a]">
          <Link to="/" className="text-[#239c47]">
            ZENMO<span className="text-[#3b82f6] text-4xl">.</span>
          </Link>
          <p className="text-xs italic text-pink-500">Super admin dashboard</p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5">
          {navItems.map((item, index) => (
            <li key={index} className="text-[#0f172a] hover:text-[#f95937]">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive ? "text-[#f95937] font-semibold" : ""
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* logout */}
      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-[#f95937] px-5 py-1 font-medium rounded-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
