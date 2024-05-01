import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'roote',
  version: 1,
  storage,
};

const combinReducer = combineReducers({});

const persistedReducer = persistReducer(persistConfig, combinReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
