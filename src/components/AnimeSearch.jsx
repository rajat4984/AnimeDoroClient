import React, { useEffect, useState } from 'react';
import '../styles/components/animeSearch.scss';
import { useNavigate, useParams } from 'react-router-dom';
const AnimeSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const { animeName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(animeName);
  }, [animeName]);

  return (
    <div className="anime-search">
      <div>
        <img src="/assets/images/anime-search.svg" />
      </div>
      <div className="search-form">
        <form onSubmit={() => navigate(`/animeSearch/${searchValue}`)}>
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
