import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import globalReducer from './globalSlice/globalSlice';
import chartReducer from "./chartSlice/chartSlice"

// const persistConfig = {
//   key: 'roote',
//   version: 1,
//   storage,
// };

// const combinReducer = combineReducers({
//   global: globalReducer,
// });

// const persistedReducer = persistReducer(persistConfig, combinReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

export const store = configureStore({
  reducer: {
    global: globalReducer,
    chart:chartReducer
  },
});
