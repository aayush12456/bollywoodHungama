
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const verifyLoginOtpAsync = createAsyncThunk(
  'verifyLoginOtp/verifyLoginOtpAsync',
  async (verifyLoginOtpObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/verifyOtp', verifyLoginOtpObj, {
        headers: { 'Content-Type': "application/json" }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }

      const Responedata = response.data;
      // console.log('verify otp response data ', Responedata);
      sessionStorage.setItem('verifyLoginOtpObject',JSON.stringify(Responedata))
      return Responedata;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const verifyLoginOtpSlice = createSlice({
  name: 'verifyLoginOtp',
  initialState: {
    verifyLoginOtpData: {},
  },
  reducers: {
    // ✅ New action to reset registerData
    resetVerifyLoginOtpState: (state) => {
      state.verifyLoginOtpData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase( verifyLoginOtpAsync.fulfilled, (state, action) => {
      state.verifyLoginOtpData = action.payload;
    });
    builder.addCase( verifyLoginOtpAsync.rejected, (state, action) => {
      state.verifyLoginOtpData = action.payload; // Keeping it consistent (was responseData earlier)
    });
  },
});

export const {resetVerifyLoginOtpState } = verifyLoginOtpSlice.actions; // ✅ Export action
export default verifyLoginOtpSlice.reducer;
