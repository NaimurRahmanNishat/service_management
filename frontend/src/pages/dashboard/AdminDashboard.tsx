// src/pages/dashboard/AdminDashboard.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useUserLogoutMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

interface NavItems {
  path: string;
  label: string;
}

const navItems: NavItems[] = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/user-management", label: "User Management" },
  { path: "/dashboard/vendor-management", label: "Vendor Management" },
  { path: "/dashboard/service-management", label: "Service Management" },
  { path: "/dashboard/booking-management", label: "Booking Management" },
  { path: "/dashboard/commission", label: "Commission & Payment" },
  { path: "/dashboard/earnings",  label: "Earnings & Withdrawals" },
  { path: "/dashboard/reviews",  label: "Reviews & Ratings" },
  { path: "/dashboard/reports", label: "Reports & Analytics" },
  { path: "/dashboard/profile", label: "Profile & Settings" },
];

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="bg-white text-black font-medium flex flex-col md:h-screen p-4">
      {/* Header (Logo + Toggle) */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-extrabold text-[#0f172a] px-4">
          <Link to="/" className="text-[#239c47] text-start">
            ZENMO<span className="text-[#3b82f6] text-4xl">.</span>
          </Link>
          <p className="text-xs italic text-[#3785f9] hidden md:block">
            Admin dashboard
          </p>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Nav Menu */}
      <div
        className={`flex-1 flex-col justify-between ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <div>
          <ul className="space-y-4 pt-2 md:pt-5">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-[#f95937] font-semibold"
                        : "hover:text-[#f95937]"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
            <div className="mb-3">
              <hr className="mb-3" />
              <button
                onClick={handleLogout}
                className="text-white flex items-center bg-[#f95937] px-5 py-1 font-medium rounded-sm cursor-pointer"
              >
                <FaArrowRightFromBracket className="mr-2" />
                Logout
              </button>
            </div>
    </div>
  );
};

export default AdminDashboard;
