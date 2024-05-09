import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  isOpen: false,
  data: [],
  error: '',
  isLoading: false,
};

const addPomoData = createAsyncThunk(
  '/users/addPomoData',
  async ({ userId, minutes, token }, { rejectWithValue }) => {
    try {
      console.log('token', token);
      const res = await axios.post(
        `${API_URL}/users/addPomoData`,
        {
          userId,
          minutes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const getPomoData = createAsyncThunk(
  '/users/getPomoData',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/users/getPomoData`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.pomoData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    toggleCardPage: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPomoData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addPomoData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addPomoData.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload;
    });
    builder.addCase(getPomoData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPomoData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder
      .addCase(getPomoData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export { addPomoData, getPomoData };
export const { toggleCardPage } = chartSlice.actions;
export default chartSlice.reducer;
