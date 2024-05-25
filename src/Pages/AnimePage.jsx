import React, { useEffect } from 'react';
import AnimeLogin from '../components/AnimeLogin';
import AnimeSearch from '../components/AnimeSearch';
import { useCookies } from 'react-cookie';

const AnimePage = ({ animeList, setAnimeList, loading, setLoading }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div>
      {cookies.mal_access_token ? (
        <AnimeSearch
          loading={loading}
          setLoading={setLoading}
          animeList={animeList}
          setAnimeList={setAnimeList}
        />
      ) : (
        <AnimeLogin />
      )}
    </div>
  );
};

export default AnimePage;
