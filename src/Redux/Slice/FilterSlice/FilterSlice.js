import { createSlice } from "@reduxjs/toolkit";
const FilterSlice=createSlice({
    name:'FilterSliceData',
    initialState:{
        FilterSliceData:{}
    },
    reducers:{
        FilterSliceData(state,action){
        state.FilterSliceData=action.payload
        }
    }
})
export const FilterSliceAcions=FilterSlice.actions
export default FilterSlice.reducer