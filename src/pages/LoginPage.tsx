import React from "react";
import LoginForm from "../components/LoginForm";
import SidePart from "../components/SidePart";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Left Section: SidePart */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <SidePart />
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default LoginPage;

