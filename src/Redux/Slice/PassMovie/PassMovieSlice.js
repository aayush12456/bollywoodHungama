import { createSlice } from "@reduxjs/toolkit";
const PassMovieSlice=createSlice({
    name:'PassMovie',
    initialState:{
        passMovie:{}
    },
    reducers:{
        passMovieData(state,action){
        state.passMovie=action.payload
        }
    }
})
export const PassMovieSliceAcions=PassMovieSlice.actions
export default PassMovieSlice.reducer