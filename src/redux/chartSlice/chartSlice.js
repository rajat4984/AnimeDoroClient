import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  data: [],
  error: '',
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    toggleCardPage: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});


export const {toggleCardPage} = chartSlice.actions;
export default chartSlice.reducer;
