import { NavLink } from "react-router-dom";

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

const AdminMenu = ({ onClick }: { onClick?: () => void }) => (
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

export default AdminMenu;
