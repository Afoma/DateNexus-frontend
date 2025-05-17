import * as React from "react";
import { Bell, User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="h-16 flex justify-between items-center px-6 py-4 overflow-hidden">
      <button
        className="bg-[#F5F6F8] p-3 rounded-md hover:shadow-lg transition-shadow"
        aria-label="User Profile"
      >
        <User className="w-5 h-5" />
      </button>

      <div className="flex gap-4 bg-[#F5F6F8] p-3 hover:shadow-lg cursor-pointer">
        <button
          className="relative text-gray-600 hover:text-pink-500 transition-colors rounded-md"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full  text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
