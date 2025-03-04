import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Merchants {
  id: string;
  [key: string]: any;
}

const allMerchantsSlice = createSlice({
  name: "Merchants",
  initialState: [] as Merchants[],
  reducers: {
    addMerchant: (state, action: PayloadAction<Merchants>) => {
      state.push(action.payload);
      console.log("In Merchant slice " + JSON.stringify(action.payload));
      console.log("all Merchant" + JSON.stringify(state))
    },
  },
});

export const { addMerchant } = allMerchantsSlice.actions;
export default allMerchantsSlice.reducer;
