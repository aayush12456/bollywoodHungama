import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const AddMovieData=createAsyncThunk('AddMovie/add',async(values)=>{
    try{
        const response =await fetch('https://movieproject-e1e03-default-rtdb.firebaseio.com/moviePoster.json',{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify(values)
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
 const AddMovieSlice=createSlice({
    name:'AddMovie',
   
 })
 export default AddMovieSlice.reducer