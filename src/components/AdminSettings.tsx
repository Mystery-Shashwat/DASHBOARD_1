import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/appStore";
import { toggleSetting } from "../Redux/settingSlice";
import { Settings2 } from "lucide-react"; // Use a more stylized settings icon

const AdminSettings: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const handleToggle = (setting: keyof typeof settings) => {
    console.log("In admin setting");
    dispatch(toggleSetting(setting));
  };

  return (
    <div className="max-w-3xl mx-auto mt-4  px-10 py-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Settings2 className="h-9 w-9 text-indigo-600 animate-spin-slow" />
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Admin Settings
          </h2>
        </div>
        <span className="text-sm font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full shadow-sm">
          Feature Controls
        </span>
      </div>

      {/* Settings Container */}
      <div className="space-y-8">
        {/* Notifications Toggle */}
        <div className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleToggle("notifications")}
                className="peer sr-only"
              />
              <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-all duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <div className="ml-5">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                Notifications
              </span>
              <p className="text-sm text-gray-500">
                Toggle user notification access
              </p>
            </div>
          </label>
          <span
            className={`font-medium px-4 py-1.5 rounded-full text-sm shadow-sm ${
              settings.notifications
                ? "text-green-700 bg-green-100/80"
                : "text-red-700 bg-red-100/80"
            }`}
          >
            {settings.notifications ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Documents Toggle */}
        <div className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.documents}
                onChange={() => handleToggle("documents")}
                className="peer sr-only"
              />
              <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-all duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <div className="ml-5">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                Documents
              </span>
              <p className="text-sm text-gray-500">
                Manage document feature visibility
              </p>
            </div>
          </label>
          <span
            className={`font-medium px-4 py-1.5 rounded-full text-sm shadow-sm ${
              settings.documents
                ? "text-green-700 bg-green-100/80"
                : "text-red-700 bg-red-100/80"
            }`}
          >
            {settings.documents ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Transactions Toggle */}
        <div className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.transactions}
                onChange={() => handleToggle("transactions")}
                className="peer sr-only"
              />
              <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-all duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform peer-checked:translate-x-6 transition-all duration-300"></div>
            </div>
            <div className="ml-5">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                Transactions
              </span>
              <p className="text-sm text-gray-500">
                Control transaction feature access
              </p>
            </div>
          </label>
          <span
            className={`font-medium px-4 py-1.5 rounded-full text-sm shadow-sm ${
              settings.transactions
                ? "text-green-700 bg-green-100/80"
                : "text-red-700 bg-red-100/80"
            }`}
          >
            {settings.transactions ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
