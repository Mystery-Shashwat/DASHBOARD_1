import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SupportChatBot from "./components/SupportChatBot.tsx";
import Support from "./assets/images/support.png";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSupport, setIsSupport] = useState<boolean>(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar setIsOpen={setIsOpen} />

      {/* Sidebar + Content */}
      <div className="flex flex-1 h-full overflow-hidden">
        <Sidebar isOpen={isOpen} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto scrollbar-hidden bg-gray-100">
          <Outlet />

          {/* Support Icon & Chatbot */}
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
        </main>
      </div>
    </div>
  );
};

export default Layout;
