import { createSlice } from "@reduxjs/toolkit";

const hamburgerSlice = createSlice({
  name: "hamburgerToggle",
  initialState: {
    hamburgerToggle: false,
  },
  reducers: {
    handleToggle(state){
        state.hamburgerToggle = !state.hamburgerToggle;
      
    },
  },
});

export const hamburgerActions = hamburgerSlice.actions
export default hamburgerSlice.reducer