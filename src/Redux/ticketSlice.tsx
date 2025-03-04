import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  id: string;
  issue: string; 
  status?: string; 
  createdAt: string; 
  [key: string]: any; 
}

const ticketSlice = createSlice({
  name: "ticket",
  initialState: [] as Ticket[],
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.push(action.payload);
      console.log("In ticket slice " + JSON.stringify(action.payload));
      console.log("all tickets" + JSON.stringify(state));
    },
    closeTicket: (state, action: PayloadAction<string>) => {
      const ticketIndex = state.findIndex(
        (ticket) => ticket.id === action.payload
      );
      if (ticketIndex !== -1) {
        state[ticketIndex].status = "closed";
      }
    },
  },
});

export const { addTicket, closeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;