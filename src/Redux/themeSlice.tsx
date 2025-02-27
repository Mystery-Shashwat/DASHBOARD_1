import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "idfc";
console.log("Initial theme: " + initialTheme);

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: initialTheme },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      console.log("In setTheme in slice" + state.theme);
      localStorage.setItem("theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
