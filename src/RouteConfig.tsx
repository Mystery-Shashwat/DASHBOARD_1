import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import SignUpForm from "./components/SignUpForm";
import Layout from "./Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Recent from "./pages/Recent";

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
      <Route
        path="/"
        element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/signup" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignUpPage onSignup={handleSignup} /> : <Navigate to="/home" />}
      />
      
      {/* Protected routes wrapped in Layout */}
      <Route
        element={isAuthenticated ? <Layout /> : <Navigate to="/" />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/transactions">
          <Route path="recent" element={<Recent />} />
          <Route path="pending" element={<div>Pending Transactions</div>} />
          <Route path="reports" element={<div>Transaction Reports</div>} />
        </Route>
        <Route path="/clients">
          <Route path="all" element={<div>All Clients</div>} />
          <Route path="vip" element={<div>VIP Accounts</div>} />
          <Route path="prospects" element={<div>Prospects</div>} />
        </Route>
        <Route path="/products">
          <Route path="investments" element={<div>Investments</div>} />
          <Route path="loans" element={<div>Loans</div>} />
          <Route path="insurance" element={<div>Insurance</div>} />
        </Route>
        <Route path="/analytics" element={<div>Analytics</div>} />
        <Route path="/history" element={<div>History</div>} />
        <Route path="/messages" element={<div>Messages</div>} />
        <Route path="/notifications" element={<div>Notifications</div>} />
        <Route path="/documents" element={<div>Documents</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
      </Routes>
    </div>
  );
};

export default RouteConfig;
