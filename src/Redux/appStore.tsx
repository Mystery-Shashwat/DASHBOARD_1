// import { configureStore } from "@reduxjs/toolkit";
// import themeReducer from "./themeSlice";

// export const store = configureStore({
//   reducer: {
//     theme: themeReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"; // Adjust path if needed
import ticketReducer from "./ticketSlice"
import merchantReducer from "./allMerchantsSlice"
export const appStore = configureStore({
  reducer: {
    theme: themeReducer,
    ticket : ticketReducer,
    merchant : merchantReducer
  },
});

// Define types for useSelector and useDispatch
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
