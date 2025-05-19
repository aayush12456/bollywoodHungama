
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const userLoginOtpAsync = createAsyncThunk(
  'userLoginOtp/userLoginOtpAsync',
  async (loginOtpObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', loginOtpObj, {
        headers: { 'Content-Type': "application/json" }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }

      const Responedata = response.data;
      // console.log('login otp response data ', Responedata);
      sessionStorage.setItem('otpObject',JSON.stringify(Responedata))
      return Responedata;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userLoginOtpSlice = createSlice({
  name: 'userLoginOtp',
  initialState: {
    loginOtpData: {},
  },
  reducers: {
    // ✅ New action to reset registerData
    resetLoginOtpState: (state) => {
      state.loginOtpData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginOtpAsync.fulfilled, (state, action) => {
      state.loginOtpData = action.payload;
    });
    builder.addCase(userLoginOtpAsync.rejected, (state, action) => {
      state.loginOtpData = action.payload; // Keeping it consistent (was responseData earlier)
    });
  },
});

export const { resetLoginOtpState } = userLoginOtpSlice.actions; // ✅ Export action
export default userLoginOtpSlice.reducer;
