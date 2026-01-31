// src/components/shared/HeaderBottom.tsx
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/technology", label: "Technology" },
  { path: "/health", label: "Health" },
  { path: "/lifestyle", label: "Lifestyle" },
  { path: "/fitness", label: "Fitness" },
  { path: "/house", label: "House" },
  { path: "/land", label: "Land" },
  { path: "/vehicle", label: "Vehicle" },
  { path: "/others", label: "Others" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

interface Props {
  onClick?: () => void;
}

const HeaderBottom = ({ onClick }: Props) => {
  return (
    <div className="flex md:items-center flex-col md:space-x-6 md:flex-row space-y-3 md:space-y-0">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClick}
          className={({ isActive }) =>
            `relative group px-1 pb-1 font-medium transition-colors duration-300 ${
              isActive ? "text-[#239c47]" : "text-gray-700 hover:text-[#239c47]"
            }`
          }
        >
          {({ isActive }) => (
            <div className="relative inline-block">
              {item.label}

              {/* Hover underline */}
              {!isActive && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#239c47] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
              )}

              {/* Active underline animation */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="active-underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-[#239c47] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ originX: 0 }}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default HeaderBottom;
