import React, { useEffect, useState } from 'react';
import '../styles/components/animeSearch.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { searchAnime } from '../styles/utilities/malCalls';
const AnimeSearch = ({ animeList, setAnimeList, setLoading }) => {
  const [searchValue, setSearchValue] = useState('');
  const { animeName } = useParams();
  const navigate = useNavigate();

  const handleSearch = async (searchedName) => {
    try {
      setLoading(true);
      const res = await searchAnime(searchedName);
      setAnimeList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchValue(animeName);
  }, [animeName]);

  return (
    <div className="anime-search">
      <div>
        <img src="/assets/images/anime-search.svg" />
      </div>
      <div className="search-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchValue);
            navigate(`/animeSearch/${searchValue}`);
          }}
        >
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
