import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  id: string;
  [key: string]: any;
}

const ticketSlice = createSlice({
  name: "ticket",
  initialState: [] as Ticket[],
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.push(action.payload);
      console.log("In ticket slice " + JSON.stringify(action.payload));
      console.log("all tickets" + JSON.stringify(state))
    },
  },
});

export const { addTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
