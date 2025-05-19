import { configureStore } from "@reduxjs/toolkit";
import hamburgerSlice from "../authSlice/hamburgerSlice";
import AddMovieSlice from "../movieSlice/movieSlice";
import PassMovieSlice from "../PassMovie/PassMovieSlice";
import FilterSlice from "../FilterSlice/FilterSlice";
import profileNameSlice from "../profileName/profileNameSlice";
import passSliceData from "../passSlice/passSliceData";
import registerSlice from "../registerSlice/registerSlice";
import loginOtpSlice from "../loginOtpSlice/loginOtpSlice";
import verifyOtpSlice from "../verifyOtpSlice/verifyOtpSlice";
import profilesSlice from "../profilesSlice/profilesSlice";
import deleteUserSlice from "../deleteProfileUser/deleteProfileUser";
import getAllUserSlice  from "../allUserSlice/allUserSlice";
const store = configureStore({
    reducer: { 
        hamburger:hamburgerSlice,
        movieSlice:AddMovieSlice.reducer,
        passMovie:PassMovieSlice,
        filterSlice:FilterSlice,
        profileName:profileNameSlice,
        profileData:passSliceData,
        registerData:registerSlice,
        loginOtpData:loginOtpSlice,
        verifyOtpData:verifyOtpSlice,
        profiles:profilesSlice,
        deleteUser:deleteUserSlice,
        getAllUser:getAllUserSlice,
    
    }
})
export default store