import { createSlice } from "@reduxjs/toolkit";
const ProfileNameSlice=createSlice({
    name:'profileName',
    initialState:{
        profileName:[]
    },
    reducers:{
        profileNameData(state,action){
        state.profileName=action.payload
        // console.log(state.profileName)    // console.log(state.profileName)
        }
    }
})
export const ProfileNameSliceActions=ProfileNameSlice.actions
export default ProfileNameSlice.reducer