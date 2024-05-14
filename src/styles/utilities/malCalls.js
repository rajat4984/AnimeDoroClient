import axios from 'axios';
import { getCookie } from './cookies';

const API_URL = import.meta.env.VITE_API_URL;

export const getAccessToken = async (convertedArr) => {
  console.log('CONVERTED ARR', convertedArr);
  const tokenResponse = await axios.post(
    `${API_URL}/auth/get-token`,
    {
      code: convertedArr[0],
      state: convertedArr[1],
      challenge: sessionStorage.getItem('codeChallenge'),
    },

    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return tokenResponse;
};

export async function getProfileInfo() {
  try {
    return await axios.get(`${API_URL}/auth/get-profile-info`, {
      params: {
        access_token: getCookie('mal_access_token'),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const getAnimeInfo = async (searchVal) => {
  
};
