import React from "react";
import { Link } from "react-router-dom";
import ThemeDropdown from "../ThemeDropdown";
import toast from "react-hot-toast";

const SignOutCard: React.FC = () => {
  return (
    <div className="absolute right-4 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 p-4">
      <div className="flex flex-col items-start space-y-2">
        <button className="w-full text-left text-black px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-backgroundsidebar hover:text-white">
          Profile
        </button>
        <button className="w-full text-left text-black px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-backgroundsidebar hover:text-white">
          Settings
        </button>
        <div className="w-full">
          <ThemeDropdown />
        </div>
        <Link
          to="/"
          className="w-full text-left text-textsecondary px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-backgroundsidebar hover:text-white"
          onClick={() => toast.success("Signed Out Successfully!")}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default SignOutCard;
