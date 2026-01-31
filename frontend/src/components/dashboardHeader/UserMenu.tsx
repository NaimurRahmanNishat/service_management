import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard/user", label: "Dashboard" },
  { path: "/dashboard/my-bookings", label: "My Bookings" },
  { path: "/dashboard/payment-history", label: "Payment History" },
  { path: "/dashboard/profile", label: "Profile Settings" },
  { path: "/dashboard/support", label: "Support / Help Center" },
];

const UserMenu = ({ onClick }: { onClick?: () => void }) => {
  return (
    <ul className="space-y-4 px-6 pt-4">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            onClick={onClick}
            className={({ isActive }) =>
              isActive
                ? "text-[#f95937] font-semibold"
                : "text-[#0f172a]"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default UserMenu;
