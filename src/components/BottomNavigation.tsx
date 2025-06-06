import { menuItems } from "@/lib/constants";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 lg:px-0 pb-4 rounded-xl">
      <nav className="w-full flex justify-around items-center h-16 bg-custom-pink border-t border-gray-200 lg:w-[600px] lg:rounded-full lg:border lg:border-gray-200/20 lg:shadow-lg lg:shadow-black/5 lg:backdrop-blur-md lg:bg-custom-pink/90 transition-all duration-300 ease-in-out hover:lg:shadow-xl rounded-xl">
        {menuItems.map(({ id, icon, activeIcon, label, path }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center w-full h-full group transition-all duration-200 ${
                isActive
                  ? "active lg:after:content-[''] lg:after:absolute lg:after:bottom-3 lg:after:left-1/2 lg:after:w-1 lg:after:h-1 lg:after:bg-white lg:after:rounded-full lg:after:-translate-x-1/2"
                  : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <img
                    src={isActive ? activeIcon : icon}
                    alt={label}
                    className="w-6 h-6 transition-transform duration-200 lg:group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-white/10 rounded-full scale-0 transition-transform duration-200 ${
                      isActive ? "lg:group-hover:scale-150" : ""
                    }`}
                  />
                </div>
                <span
                  className={`text-xs mt-1 transition-all duration-200 ${
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-300 group-hover:text-gray-100"
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;
