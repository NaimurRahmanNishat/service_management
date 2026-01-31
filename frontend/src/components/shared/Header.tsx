// src/components/shared/Header.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useUserLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import HeaderBottom from "./HeaderBottom";
import SearchBar from "./SearchBar";
import MobileSearch from "./MobileSearch";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useUserLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res?.success) {
        dispatch(logout());
        toast.success("Logout successful!");
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to logout!");
    }
  };

  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === "user") navigate("/dashboard/user");
    else if (user.role === "vendor") navigate("/dashboard/vendor");
    else if (user.role === "admin") navigate("/dashboard/admin");
    else if (user.role === "super_admin") navigate("/dashboard/super-admin");
  };


  return (
    <header
      className={`bg-gray-200 bg-opacity-75 sticky top-0 left-0 w-full z-50 shadow duration-300 ${
        menuOpen ? "shadow-lg" : "shadow-none"
      }`}
    >
      {/* ================= DESKTOP HEADER ================= */}
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          <Link
            to="/"
            className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Zen<span className="text-yellow-500">mo</span>
          </Link>
        </h1>

        {/* Search */}
        <SearchBar />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3">
          {/* Avatar */}
          <button onClick={handleProfileClick} className="cursor-pointer">
            <img
              src={user?.avatar?.url || userIcon}
              alt="avatar"
              className="w-10 h-10 rounded-full border hover:ring-2 hover:ring-blue-400 transition"
            />
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="relative overflow-hidden font-medium text-orange-600 px-4 py-2 border-2 border-orange-600 hover:border-white rounded-sm before:absolute before:inset-0 before:bg-green-600 before:origin-left before:scale-x-0 before:transition-transform hover:before:scale-x-100 hover:text-white"
              >
                <span className="relative z-10">Login</span>
              </Link>

              <Link
                to="/register"
                className="relative overflow-hidden font-medium text-yellow-600 border-yellow-600 hover:border-white px-4 py-2 border-2 rounded-sm before:absolute before:inset-0 before:bg-green-600 before:origin-left before:scale-x-0 before:transition-transform hover:before:scale-x-100 hover:text-white"
              >
                <span className="relative z-10">Register</span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="relative overflow-hidden cursor-pointer font-medium px-4 py-2 border-2 border-red-200 rounded-sm before:absolute before:inset-0 before:bg-red-500 before:origin-left before:scale-x-0 before:transition-transform hover:before:scale-x-100 hover:text-white"
            >
              <span className="relative z-10">Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden flex gap-2">
          <MobileSearch/>
          <div onClick={handleProfileClick}>
            <img
              src={user?.avatar?.url || userIcon}
              alt="avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex items-center gap-2"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 left-0 w-72 h-screen bg-white z-50 md:hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src={user?.avatar?.url || userIcon}
                  className="w-10 h-10 rounded-full border"
                />
              </div>

              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-6 p-4">
              <HeaderBottom onClick={() => setMenuOpen(false)} />

              <hr />

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="border-2 px-4 py-2 text-center rounded-sm hover:bg-green-600 hover:text-white transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="border-2 px-4 py-2 text-center rounded-sm hover:bg-green-600 hover:text-white transition"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="border px-4 py-2 rounded-sm text-red-600 hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              )}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
