import { configureStore } from "@reduxjs/toolkit";
import hamburgerSlice from "../authSlice/hamburgerSlice";
import AddMovieSlice from "../movieSlice/movieSlice";
import PassMovieSlice from "../PassMovie/PassMovieSlice";
import FilterSlice from "../FilterSlice/FilterSlice";
const store = configureStore({
    reducer: { 
        hamburger:hamburgerSlice,
        movieSlice:AddMovieSlice.reducer,
        passMovie:PassMovieSlice,
        filterSlice:FilterSlice,
  
    
    }
})
export default store