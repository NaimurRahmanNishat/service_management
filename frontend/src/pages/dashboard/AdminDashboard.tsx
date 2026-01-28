import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    </div>
  );
};

export default AdminDashboard;
