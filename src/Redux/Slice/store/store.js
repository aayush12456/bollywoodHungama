import { configureStore } from "@reduxjs/toolkit";
import hamburgerSlice from "../authSlice/hamburgerSlice";
import AddMovieSlice from "../movieSlice/movieSlice";
import PassMovieSlice from "../PassMovie/PassMovieSlice";
const store = configureStore({
    reducer: { 
        hamburger:hamburgerSlice,
        movieSlice:AddMovieSlice.reducer,
        passMovie:PassMovieSlice
    
    }
})
export default store