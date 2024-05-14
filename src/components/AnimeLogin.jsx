import React, { useEffect } from 'react';
import { SiMyanimelist } from 'react-icons/si';
import '../styles/components/animeLogin.scss';
import axios from 'axios';

const AnimeLogin = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const handelLogin = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/anime-proxy`, {
        params: { challenge: sessionStorage.getItem('codeChallenge') },
      });

      console.log(response, 'response');

      const path = `https://myanimelist.net${response.data.path}`;
      window.location.href = path;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="anime-login">
        <div>
          <img src="/assets/images/anime-login.svg" />
        </div>
        <div>
          <button onClick={handelLogin}>
            Login with <SiMyanimelist size={25} className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeLogin;
