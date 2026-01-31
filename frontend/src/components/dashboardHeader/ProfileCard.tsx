// src/components/dashboardHeader/ProfileCard.tsx
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface Props {
  setMenuOpen(value: boolean): void;
  handleLogout: () => void;
}

const ProfileCard = ({ setMenuOpen, handleLogout }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-all"
        onMouseLeave={() => setMenuOpen(false)}
      >
        {/* user iamge & name & role */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex gap-2">
          {user?.avatar?.url ? (
            <img
              src={user?.avatar?.url}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <img
              src={userIcon}
              alt="userIcons"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>

        <ul className="py-2">
          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard/profile");
              }}
              className="block cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
