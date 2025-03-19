import React, { useState, useEffect } from "react";
import { ShieldOff, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log(`Access attempt denied: ${new Date().toISOString()}`);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex items-center justify-center  bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                <span className="text-xs font-medium text-red-500">
                  Access Restricted
                </span>
              </div>
              <div className="text-xs text-gray-400">Error 403</div>
            </div>

            <div className="p-8">
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center mb-8"
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-red-100 rounded-full scale-150 opacity-30 animate-ping"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-br from-red-50 to-red-100">
                    <ShieldOff
                      className="h-8 w-8 text-red-500"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <motion.h1
                  variants={itemVariants}
                  className="text-2xl font-bold text-gray-900"
                >
                  Access Denied
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-500 mt-3 max-w-xs"
                >
                  You don't have permission to access this feature. It has been
                  disabled by the administrator.
                </motion.p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col space-y-3"
              >
                <Button
                  variant="default"
                  className="w-full bg-textsecondary hover:bg-textsecondary text-white py-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm"
                  onClick={() => navigate("/dashboard")}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Return to Dashboard
                </Button>

                <div className="flex justify-center">
                  <button
                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center transition-colors duration-200"
                    onClick={() => navigate("/help/permissions")}
                  >
                    <span>Learn about permissions</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100"
            >
              If you believe this is an error, please contact support
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
