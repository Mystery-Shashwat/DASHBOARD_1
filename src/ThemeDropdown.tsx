import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./Redux/themeSlice";
import { RootState } from "./Redux/appStore"; 
import React from "react";

const themes: string[] = ["idfc", "nubank"];

const ThemeDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <select value={theme} onChange={handleThemeChange}>
      {themes.map((themeName) => (
        <option key={themeName} value={themeName}>
          {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ThemeDropdown;
