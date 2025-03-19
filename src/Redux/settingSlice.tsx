import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  notifications: boolean;
  documents: boolean;
  transactions: boolean;
}

const initialState: SettingsState = {
  notifications: true,
  documents: true,
  transactions: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSetting: (state, action: PayloadAction<keyof SettingsState>) => {
    //   console.log(action.payload);
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleSetting } = settingsSlice.actions;
export default settingsSlice.reducer;
