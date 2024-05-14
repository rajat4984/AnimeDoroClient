import React, { useEffect } from 'react';
import '../styles/components/animeSearch.scss';
import { IoIosSearch } from 'react-icons/io';
const AnimeSearch = () => {
  return (
    <div className="anime-search">
      <div>
        <img src="/assets/images/anime-search.svg" />
      </div>
      <div className="search-form">
        <form>
          <input type="text" placeholder="Search anime" />

          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default AnimeSearch;
