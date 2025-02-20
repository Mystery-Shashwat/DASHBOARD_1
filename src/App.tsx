import React from "react";
import RouteConfig from "./RouteConfig";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./Redux/themeSlice";
import { useDispatch } from "react-redux";
const App: React.FC = () => {
  console.log("In app.tsx");
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  console.log(theme);

  useEffect(() => {
    console.log("In useffect " + theme);
    dispatch(setTheme(theme));
    // document.documentElement.className = theme; // Apply theme class to <html>
  }, []);

  return <RouteConfig />;
};

export default App;
