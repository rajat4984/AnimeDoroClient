import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import globalReducer from './globalSlice/globalSlice';
import chartReducer from './chartSlice/chartSlice';
import userReducer from './userSlice/userSlice';

const persistConfig = {
  key: 'roote',
  version: 1,
  storage,
};

const combinReducer = combineReducers({
  global: globalReducer,
  chart: chartReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, combinReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// export const store = configureStore({
//   reducer: {

//   },
// });
