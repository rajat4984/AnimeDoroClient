import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

const API_URL = import.meta.env.VITE_API_URL;

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
      const res = await axios.post(`${API_URL}/auth/register`, registerForm, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk(
  '/auth/login',
  async (loginForm, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginForm, {
        withCredentials: true,
      });
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
    //register
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

    //login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;

      const { email, username, _id: userId, pomoData } = action.payload.data;

      state.user = { email, username, userId, pomoData };
    });
    builder
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action, 'actionr');
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export { register, login };
export default userSlice.reducer;
