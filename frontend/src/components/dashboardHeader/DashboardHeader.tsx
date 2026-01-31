// src/components/dashboardHeader/DashboardHeader.tsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import userIcon from "../../assets/user.png";
import type { RootState } from "@/redux/store";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { useEffect, useState } from "react";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";
import MobileDashboardMenu from "./MobileDashboardMenu";
import { Menu } from "lucide-react";
import { useGetAllUsersQuery } from "@/redux/features/users/userApi";
import Loading from "../shared/Loading";
import type { IUser } from "@/types/userType";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const canSearchUsers = user?.role === "admin" || user?.role === "super_admin" || user?.role === "vendor";

  const [logoutUser] = useUserLogoutMutation();
const { data, isLoading, error, refetch } = useGetAllUsersQuery(
    { search: search.length > 1 ? search : undefined },
    { skip: !canSearchUsers }
  );
  const allUsers = data?.data || [];

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

  const handleUserRedirect = (user: IUser) => {
    setShowResult(false);
    setSearch("");

    if (user.role === "admin") {
      navigate("/dashboard/admin-management");
    }

    if (user.role === "vendor") {
      navigate("/dashboard/vendor-management");
    }

    if (user.role === "user") {
      navigate("/dashboard/user-management");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 1) {
        refetch();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const close = () => setShowResult(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to load users!</div>;

  return (
    <header className="relative mx-4 md:mx-12 bg-gray-200 dark:bg-gray-800 text-gray-800 rounded-lg p-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* mobile menu */}
        <button onClick={() => setOpen(true)} className="flex md:hidden">
          <Menu className="cursor-pointer" />
        </button>

        {/* Search bar */}
        {canSearchUsers && (
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResult(true);
            }}
            className="px-4 py-2 w-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        )}
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
              <ProfileCard
                setMenuOpen={setMenuOpen}
                handleLogout={handleLogout}
              />
            )}
          </div>
        )}
      </div>
      {user && (
        <MobileDashboardMenu
          open={open}
          onClose={() => setOpen(false)}
          role={user.role}
        />
      )}
      {showResult && search && (
        <div className="absolute top-14 left-0 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto">
          {allUsers.length === 0 && (
            <p className="p-3 text-sm text-gray-500">No user found</p>
          )}

          {allUsers.map((u) => (
            <div
              key={u._id}
              onClick={() => handleUserRedirect(u)}
              className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <p className="font-medium">{u.name}</p>
              <p className="text-xs text-gray-500">{u.role.toUpperCase()}</p>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
