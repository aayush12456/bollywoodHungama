import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddProfileData=createAsyncThunk('AddProfile/add',async(inputObj)=>{

    try{
        const response =await fetch('https://movieproject-e1e03-default-rtdb.firebaseio.com/movieProfile.json',{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify(inputObj)
        })
        if (!response.ok) {
            throw new Error('Failed to add movie data to Firebase.');
        }
        const data=await response.json()
        return data

    } catch(error){
        throw new Error(error.message);
    }
   
    
})
 const AddProfileSlice=createSlice({
    name:'AddProfile',
   
 })
 export default AddProfileSlice.reducer