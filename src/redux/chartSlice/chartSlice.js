import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
      console.log(res, 'addData');
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPomoData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addPomoData.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action, 'resaction');
    });
    builder.addCase(addPomoData.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action, 'erroraction');
      state.error = action.payload;
    });
  },
  reducers: {
    toggleCardPage: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export { addPomoData };
export const { toggleCardPage } = chartSlice.actions;
export default chartSlice.reducer;
