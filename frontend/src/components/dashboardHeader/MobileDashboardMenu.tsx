// src/components/dashboardHeader/MobileDashboardMenu.tsx
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftFromLine, X } from "lucide-react";
import UserMenu from "./UserMenu";
import VendorMenu from "./VendorMenu";
import AdminMenu from "./AdminMenu";
import SuperAdminMenu from "./SuperAdminMenu";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  role: string;
}

const MobileDashboardMenu = ({ open, onClose, role }: Props) => {
  const renderMenu = () => {
    switch (role) {
      case "user":
        return <UserMenu onClick={onClose} />;
      case "vendor":
        return <VendorMenu onClick={onClose} />;
      case "admin":
        return <AdminMenu onClick={onClose} />;
      case "super_admin":
        return <SuperAdminMenu onClick={onClose} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Slide Menu */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[85%] bg-white z-50 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* Close button */}
            <div className="flex justify-between p-4">
              <Link
                to="/"
                className="flex items-center cursor-pointer border border-[#3b82f6] text-[#3b82f6] py-px px-1 rounded-lg hover:text-pink-600 transition-all duration-500"
              >
                <ArrowLeftFromLine />
                Home
              </Link>
              <button onClick={onClose}>
                <X
                  size={28}
                  className="hover:text-pink-600 transition-all duration-500 cursor-pointer"
                />
              </button>
            </div>

            {renderMenu()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDashboardMenu;
