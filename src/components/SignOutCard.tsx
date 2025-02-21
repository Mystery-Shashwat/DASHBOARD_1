import React from "react";
import { Link } from "react-router-dom";
import ThemeDropdown from "../ThemeDropdown";
import toast from "react-hot-toast";
const SignOutCard: React.FC = () => {
  return (
    <div className="absolute right-4 mt-2 w-48 bg-backgroundsidebar text-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-3">
        <button className="hover:bg-gray-100 hover:text-black font-bold text-white p-2 rounded cursor-pointer text-left">
          Profile
        </button>
        <button className="hover:bg-gray-100 hover:text-black font-bold text-white p-2 rounded cursor-pointer text-left">
          Settings
        </button>
        <div>
          <ThemeDropdown />
        </div>
        <Link
          to="/"
          className="hover:bg-gray-100 hover:text-black font-bold text-white p-2 rounded cursor-pointer text-textsecondary block"
          onClick={() => toast.success("Signed Out Successfully!")}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default SignOutCard;
