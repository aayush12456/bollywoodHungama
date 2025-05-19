
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const deleteUserAsync = createAsyncThunk(
  'deleteUser/deleteUserAsync',
  async (deleteUserObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/deleteProfile', deleteUserObj, {
        headers: { 'Content-Type': "application/json" }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }

      const Responedata = response.data;
      // console.log('delete user response data ', Responedata);
      return Responedata;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState: {
    deleteUserObj: {},
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.deleteUserObj = action.payload;
    });
    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.deleteUserObj = action.payload; // Keeping it consistent (was responseData earlier)
    });
  },
});

export default deleteUserSlice.reducer;
export const deleteUserSliceAction = deleteUserSlice.actions;