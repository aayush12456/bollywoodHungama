import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define an async thunk for deleting profile data
export const deleteProfileData = createAsyncThunk('AddProfile/delete', async (profileId) => {

  try {
    const response = await fetch(`https://movieproject-e1e03-default-rtdb.firebaseio.com/movieProfile/${profileId}.json`, {
  method: "DELETE",
});


    if (!response.ok) {
      throw new Error('Failed to delete data from Firebase.');
    }

    return profileId; // Return the profileId to identify which data was deleted
  } catch (error) {
    throw new Error(error.message);
  }
});

const deleteProfileSlice = createSlice({
  name: 'AddProfile',
  // ... (other slice configurations)
});

export default deleteProfileSlice.reducer;