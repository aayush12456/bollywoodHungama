import { createSlice } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
  name: "profilesToggle",
  initialState: {
    profilesToggle: false,
  },
  reducers: {
    handleProfileToggle(state){
        state.profilesToggle = !state.profilesToggle;
      
    },
  },
});

export const profilesActions = profilesSlice.actions
export default profilesSlice.reducer