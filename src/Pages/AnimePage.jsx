import React, { useEffect } from 'react';
import AnimeLogin from '../components/AnimeLogin';
import AnimeSearch from '../components/AnimeSearch';
import { useCookies } from 'react-cookie';

const AnimePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div>{cookies.mal_access_token ? <AnimeSearch /> : <AnimeLogin />}</div>
  );
};

export default AnimePage;
