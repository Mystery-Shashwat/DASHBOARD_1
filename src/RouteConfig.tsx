import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import SignUpForm from "./components/SignUpForm";
import Layout from "./Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const RouteConfig: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    setIsAuthenticated(true);
    navigate("/home");
  };

  const handleSignup = (): void => {
    setIsAuthenticated(true);
    navigate("/home");
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage onSignup={handleSignup} />} />
        
        {/* Wrapping private routes with Layout */}
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteConfig;
