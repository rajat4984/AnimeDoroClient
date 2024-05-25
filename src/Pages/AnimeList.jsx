import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/animeList.scss';
import AnimeSearch from '../components/AnimeSearch';
import Footer from '../components/Footer';
const AnimeList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [animeList, setAnimeList] = useState();
  let { animeName } = useParams();

  const searchAnime = async (searchedName) => {
    setLoading(true);
    if (searchedName !== '') {
      try {
        const res = await axios(`${API_URL}/anime/get-anime-list`, {
          params: {
            accessToken: cookies.mal_access_token,
            searchValue: searchedName,
          },
        });
        console.log(res, 'animesearch');
        setAnimeList(res.data.data);
        // return res.data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    searchAnime(animeName);
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
              <AnimeSearch searchAnime={searchAnime} />
            </div>
            <div className="grid">
              {animeList?.map((item) => {
                console.log(item, 'item');
                return (
                  <Link to={`/anime/${item.node.id}`} className="anime-card">
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
