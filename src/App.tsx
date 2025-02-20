import React from "react";
import RouteConfig from "./RouteConfig";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const App: React.FC = () => {
  console.log("In app.tsx");
  const theme = useSelector((state: any) => state.theme.theme);

  useEffect(() => {
    document.documentElement.className = theme; // Apply theme class to <html>
  }, []);

  return <RouteConfig />;
};

export default App;
