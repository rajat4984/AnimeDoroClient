import React from 'react';
import { SiMyanimelist } from 'react-icons/si';
import '../styles/components/animeLogin.scss';

const AnimeLogin = () => {
  return (
    <div>
      <div className="anime-login">
        <div>
          <img src="/assets/images/anime-login.svg" />
        </div>
        <div>
          <button>
           Login with  <SiMyanimelist size={25} className='icon' /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeLogin;
