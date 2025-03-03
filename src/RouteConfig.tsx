import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
const Layout = React.lazy(() => import("./Layout"));
// const DocumentView = React.lazy(() => import("./components/DocumentView"));
import FadeLoader from "react-spinners/FadeLoader";
import DashboardShimmer from "./components/DashboardShimmer";
import RecentShimmer from "./components/RecentShimmer";
import AllUsersShimmer from "./components/AllUsersShimmer";
<<<<<<< Updated upstream
import Documents from "./components/Documents";

import DocVerification from "./components/DocVerification";
=======
import History from "./components/History";
>>>>>>> Stashed changes
// Lazy-loaded components
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const Recent = React.lazy(() => import("./pages/Recent"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MerchantForm = React.lazy(
  () => import("./components/merchants/MerchantForm")
);
const AllUsers = React.lazy(() => import("./pages/AllUsers"));
const Tickets = React.lazy(() => import("./pages/Tickets"));


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
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
              <FadeLoader size={50} color="#007bff" speedMultiplier={0.8} />
              <p className="mt-4 text-lg text-gray-600">Loading...</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <SignUpPage onSignup={handleSignup} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            element={
              isAuthenticated ? (
                <Suspense
                  fallback={
                    <div className="min-h-screen bg-gray-100 flex">
                      {/* Sidebar Fallback */}
                      <div className="w-64 h-screen bg-gray-200 animate-pulse">
                        <div className="p-4 space-y-4">
                          {/* Sidebar Logo/Brand */}
                          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                          {/* Sidebar Navigation Items */}
                          <div className="space-y-2">
                            <div className="h-10 w-full bg-gray-300 rounded"></div>
                            <div className="h-10 w-full bg-gray-300 rounded"></div>
                            <div className="h-10 w-full bg-gray-300 rounded"></div>
                            <div className="h-10 w-full bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex-1 flex flex-col">
                        {/* Navbar Fallback */}
                        <div className="w-full h-16 bg-gray-200 animate-pulse">
                          <div className="max-w-7xl mx-auto px-4 flex items-center h-full">
                            <div className="h-8 w-32 bg-gray-300 rounded"></div>
                            <div className="ml-auto flex space-x-4">
                              <div className="h-8 w-20 bg-gray-300 rounded"></div>
                              <div className="h-8 w-20 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                        {/* Content Placeholder */}
                        <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
                          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Layout />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route
              path="/home"
              element={
                <Suspense fallback={<DashboardShimmer />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions">
              <Route
                path="recent"
                element={
                  <Suspense fallback={<RecentShimmer />}>
                    {" "}
                    <Recent />{" "}
                  </Suspense>
                }
              />
              <Route path="pending" element={<div>Pending Transactions</div>} />
              <Route path="reports" element={<div>Transaction Reports</div>} />
            </Route>
            <Route path="/clients">
              <Route
                path="all"
                element={
                  <Suspense fallback={<AllUsersShimmer />}>
                    <AllUsers />
                  </Suspense>
                }
              />
              <Route path="form" element={<MerchantForm />} />
            </Route>
            <Route path="/products">
              <Route path="investments" element={<div>Investments</div>} />
              <Route path="loans" element={<div>Loans</div>} />
              <Route path="insurance" element={<div>Insurance</div>} />
            </Route>
            <Route path="/analytics" element={<div>Analytics</div>} />
            <Route path="/history" element={<History />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route
              path="/tickets"
              element={
                <Suspense>
                  <Tickets />{" "}
                </Suspense>
              }
            />
            <Route path="/notifications" element={<div>Notifications</div>} />
<<<<<<< Updated upstream
            <Route path="/documents" element={<Documents/>} />
            <Route path="/doc-verification" element={<DocVerification/>}/>
=======
            <Route path="/documents" element={<h1>Documents</h1>} />
>>>>>>> Stashed changes
            <Route path="/settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default RouteConfig;
