import { createSlice } from "@reduxjs/toolkit";
const PassSliceData=createSlice({
    name:'profileName',
    initialState:{

        profileData:{}
    },
    reducers:{

        profileNameData(state,action){
        state.profileData=action.payload
        // console.log(state.profileName)    // console.log(state.profileName)
        }
    }
})
export const PassSliceDataActions=PassSliceData.actions
export default PassSliceData.reducer