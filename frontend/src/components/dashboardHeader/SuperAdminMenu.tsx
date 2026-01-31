import { NavLink } from "react-router-dom";

interface NavItems {
  path: string;
  label: string;
}

const navItems: NavItems[] = [
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


const SuperAdminMenu = ({ onClick }: { onClick?: () => void }) => (
  <ul className="space-y-4 px-6">
    {navItems.map((item) => (
      <li key={item.path}>
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

export default SuperAdminMenu;
