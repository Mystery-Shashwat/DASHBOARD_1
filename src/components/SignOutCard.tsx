import React from "react";
import { Link } from "react-router-dom";

const SignOutCard: React.FC = () => {
  return (
    <div className="absolute right-4 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-3">
        <button className="hover:bg-gray-100 p-2 rounded cursor-pointer text-left">
          Profile
        </button>
        <button className="hover:bg-gray-100 p-2 rounded cursor-pointer text-left">
          Settings
        </button>
        <Link
          to="/"
          className="hover:bg-gray-100 p-2 rounded cursor-pointer text-textsecondary block"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default SignOutCard;
