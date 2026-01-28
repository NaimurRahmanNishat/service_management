import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home" },
  // { path: "/services", label: "Services" },
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
  const location = useLocation();

  return (
    <ul className="flex flex-col gap-4 md:flex-row md:gap-6">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={onClick}
              className={`block text-lg font-medium transition ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderBottom;
