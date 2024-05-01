import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  isPopupOpen: false,
};

const globalSlice = new createSlice({
  name: 'global',
  initialState,
  reducers: {
    togglePopUp: (state, action) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
  },
});

export const { togglePopUp } = globalSlice.actions;

export default globalSlice.reducer;
