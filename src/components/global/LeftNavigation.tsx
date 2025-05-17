import { menuItems } from "@/lib/constants";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  path: string;
  icon: string;
  activeIcon: string;
  label: string;
  isActive: boolean;
}

const NavItem = ({ path, icon, activeIcon, label, isActive }: NavItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
          flex items-center px-5 py-3 rounded-lg mb-2 transition-all duration-300
          ${
            isActive
              ? "bg-gradient-to-r from-[#F83E67] to-[#A50976] text-white shadow-md"
              : "bg-white/70 text-gray-500 hover:bg-gray-100 hover:text-pink-500"
          }
        `
      }
    >
      <div className="flex items-center">
        <img
          src={isActive ? activeIcon : icon}
          alt={label}
          className="w-5 h-5"
        />
        <span className="ml-3 font-medium">{label}</span>
      </div>
    </NavLink>
  );
};

const LeftNavigation = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <div className="w-80 h-screen flex flex-col bg-[#F5F6F8] fixed top-0 left-0 overflow-hidden z-50">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 w-full z-0">
        <img src="/assets/topgradient.svg" alt="Top gradient" />
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-20 w-full z-0">
        <img src="/assets/bottomgradient.svg" alt="Bottom gradient" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 mt-32 relative z-10">
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            path={item.path}
            icon={item.icon}
            activeIcon={item.activeIcon}
            label={item.label}
            isActive={activePath === item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftNavigation;
