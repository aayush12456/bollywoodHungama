
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const userRegisterAsync = createAsyncThunk(
  'userRegister/userRegisterAsync',
  async (registerObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup', registerObj, {
        headers: { 'Content-Type': "application/json" }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }

      const Responedata = response.data;
      // console.log('register response data ', Responedata);
      return Responedata;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    registerData: {},
  },
  reducers: {
    // ✅ New action to reset registerData
    resetRegisterState: (state) => {
      state.registerData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
      state.registerData = action.payload;
    });
    builder.addCase(userRegisterAsync.rejected, (state, action) => {
      state.registerData = action.payload; // Keeping it consistent (was responseData earlier)
    });
  },
});

export const { resetRegisterState } = userRegisterSlice.actions; // ✅ Export action
export default userRegisterSlice.reducer;
