import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SupportChatBot from "./components/SupportChatBot";
import Support from "./assets/images/support.png";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isSupport, setIsSupport] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const showSupportChat = userRole !== "admin";

  return (
    <div className="min-h-screen max-h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="z-50">
        <Navbar setIsOpen={setIsOpen} />
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 relative">
          <div className="h-full">
            <Outlet />
          </div>

        
          {showSupportChat && (
            <div className="fixed bottom-5 right-5 z-50">
              {isSupport ? (
                <SupportChatBot closeChat={() => setIsSupport(false)} />
              ) : (
                <img
                  src={Support}
                  alt="support"
                  className="w-16 h-16 cursor-pointer hover:opacity-80 transition-all duration-300"
                  onClick={() => setIsSupport(true)}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;