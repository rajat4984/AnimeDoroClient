import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popupSettings: {
    isOpen: false,
    theme: 'light',
    music: 'On',
    pomoTime: 25,
  },
};

const globalSlice = new createSlice({
  name: 'global',
  initialState,
  reducers: {
    togglePopUp: (state, action) => {
      state.popupSettings.isOpen = !state.popupSettings.isOpen;
    },
    updatePopup: (state, action) => {
      // state.popupSettings = { ...action.payload };
      if(action.payload === 'save'){
        state.popupSettings.isOpen = false;
      }
      else if(action.payload === 'close'){
        return initialState
      }
    },
    changePopup: (state, action) => {
      const { name, value } = action.payload.target;
      state.popupSettings = {
        ...state.popupSettings,
        [name]: value,
      };
    },
  },
});

export const { togglePopUp, updatePopup, changePopup } = globalSlice.actions;

export default globalSlice.reducer;
