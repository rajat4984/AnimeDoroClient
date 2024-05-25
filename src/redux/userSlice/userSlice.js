import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  user: {},
  malUser: {},
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
      console.log(error, 'regierror');
      return rejectWithValue(error.response.data);
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
  reducers: {
    setMalUser: (state, action) => {
      console.log(action, 'malaction');
      state.malUser = {
        ...action.payload.profile,
        animeList: { ...action.payload.animeList.data },
        currentWatching: {
          anime: {
            ...action.payload.currentAnimeInfo.my_list_status,
            title: action.payload.currentAnimeInfo.title,
            main_picture: action.payload.currentAnimeInfo.main_picture,
            id: action.payload.currentAnimeInfo.id,
          },
          totalEp: action.payload.currentAnimeInfo.num_episodes,
        },
      };
    },
    setCurrentWatching: (state, action) => {
      state.malUser.currentWatching = {
        anime: {
          ...action.payload.my_list_status,
          title: action.payload.title,
          main_picture: action.payload.main_picture,
          id: action.payload.id,
        },
        totalEp: action.payload.num_episodes,
      };
    },
    updateCurrentWatching:(state,action)=>{
      console.log(action,'heloaction')
      state.malUser.currentWatching = {
        ...state.malUser.currentWatching,
        anime:{
          ...state.malUser.currentWatching.anime,
          num_episodes_watched: action.payload
        }
      }
    }
  },
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
        streak,
      } = action.payload.data.user;
      state.user = { email, username, userId, pomoData, streak };
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
    });

    //login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;

      const {
        email,
        username,
        _id: userId,
        pomoData,
        streak,
      } = action.payload.data;

      state.user = { email, username, userId, pomoData, streak };
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
export const { setMalUser, setCurrentWatching ,updateCurrentWatching} = userSlice.actions;
export default userSlice.reducer;
