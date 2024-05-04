import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate, useNavigation } from 'react-router-dom'; 
import axios from 'axios';

const initialState = {
  user: {},
  isLoading: false,
  error: '',
};

const register = createAsyncThunk(
  '/auth/register',
  async (registerForm, { rejectWithValue }) => {
    console.log(registerForm, 'register');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        registerForm
      );

      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        email,
        username,
        _id: userId,
        pomoData,
      } = action.payload.data.user;
      state.user = { email, username, userId, pomoData };
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action, 'actionr');
      // console.log(payload, 'payloadr');
    });
  },
});

export { register };
export default userSlice.reducer;
