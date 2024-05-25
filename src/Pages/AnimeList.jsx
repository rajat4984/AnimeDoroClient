import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/pages/animeList.scss';
import AnimeSearch from '../components/AnimeSearch';
import { searchAnime } from '../styles/utilities/malCalls';
const AnimeList = ({ animeList, setAnimeList, loading, setLoading }) => {
  let { animeName } = useParams();
  const handleSearch = async (searchedName) => {
    try {
      setLoading(true);
      const res = await searchAnime(searchedName);

      await setAnimeList(res.data.data);
   
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  useEffect(() => {
    handleSearch(animeName);
  }, []);
  return (
    <>
      <div className="anime-list">
        {loading ? (
          <div className="loader">
            <CircularProgress size={100} sx={{ color: '#f75151' }} />
          </div>
        ) : (
          <>
            <div>
              <AnimeSearch animeList={animeList} setAnimeList={setAnimeList} loading={loading} setLoading={setLoading} />
            </div> 
            <div className="grid">
              {animeList?.map((item) => {
                return (
                  <Link
                    key={item?.node?.id}
                    to={`/anime/${item.node.id}`}
                    className="anime-card"
                  >
                    <div>
                      <img src={item.node.main_picture.large} />
                    </div>
                    <div className="anime-name">
                      <p>{item.node.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnimeList;
