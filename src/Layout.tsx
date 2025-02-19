import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// // Define props for Navbar component
// interface NavbarProps {
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar setIsOpen={setIsOpen} />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
