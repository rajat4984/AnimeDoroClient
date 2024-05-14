import React, { useEffect, useState } from 'react';
import '../styles/components/animeSearch.scss';
import { IoIosSearch } from 'react-icons/io';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const AnimeSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  const API_URL = import.meta.env.VITE_API_URL;

  const searchAnime = async () => {
    try {
      const res = await axios(`${API_URL}/anime/get-anime-list`, {
        params: {
          accessToken: cookies.mal_access_token,
          searchValue,
        },
      });
      console.log(res, 'animesearch');

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchValue !== '') searchAnime();
  }, [searchValue]);
  return (
    <div className="anime-search">
      <div>
        <img src="/assets/images/anime-search.svg" />
      </div>
      <div className="search-form">
        <form>
          <input
            type="text"
            placeholder="Search anime"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default AnimeSearch;
