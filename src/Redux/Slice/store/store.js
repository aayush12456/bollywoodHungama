import { configureStore } from "@reduxjs/toolkit";
import hamburgerSlice from "../authSlice/hamburgerSlice";
import AddMovieSlice from "../movieSlice/movieSlice";
import PassMovieSlice from "../PassMovie/PassMovieSlice";
import FilterSlice from "../FilterSlice/FilterSlice";
import AddProfileSlice from '../profileSlice/profileSlice'
import profileNameSlice from "../profileName/profileNameSlice";
import deleteProfileSlice from "../profileSlice/deleteProfileSlice";
import { profileData } from "../../../utils/constraints/ShowProfile";
import passSliceData from "../passSlice/passSliceData";
const store = configureStore({
    reducer: { 
        hamburger:hamburgerSlice,
        movieSlice:AddMovieSlice.reducer,
        profileSlice:AddProfileSlice.reducer,
        deleteProfileSlice:deleteProfileSlice.reducer,
        passMovie:PassMovieSlice,
        filterSlice:FilterSlice,
        profileName:profileNameSlice,
        profileData:passSliceData
    
    }
})
export default store