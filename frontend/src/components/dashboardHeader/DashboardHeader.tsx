/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import userIcon from "../../assets/user.png";
import type { RootState } from "@/redux/store";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { useState } from "react";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";
import { Menu } from "lucide-react";

const DashboardHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useUserLogoutMutation();

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res?.success) {
        dispatch(logout());
        toast.success(res.message || "Logged out successfully!");
        setMenuOpen(false);
        navigate("/");
      } else {
        toast.error("Logout failed!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Logout error!");
    }
  };

  return (
    <header className="relative mx-4 md:mx-12 bg-gray-200 dark:bg-gray-800 text-gray-800 rounded-lg p-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4">
      {/* mobile menu */}
      <div className="flex md:hidden">
        <Menu className="hover:cursor-pointer"/>
      </div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="border hidden md:block border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">

        {/* Language */}
        <TbWorld className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />

        {/* Notifications */}
        <IoNotificationsOutline className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />

        {/* User Profile */}
        {user && (
          <div className="relative">
            <img
              src={user?.avatar?.url || userIcon}
              alt="User avatar"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-blue-400 transition"
            />

            {/* Dropdown Menu */}
            {menuOpen && (
              <ProfileCard setMenuOpen={setMenuOpen} handleLogout={handleLogout}/>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
