import axios from 'axios';
import '../styles/pages/animeInfo.scss';
import React, { useEffect, useState, useTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material';
import { IoMdArrowBack } from 'react-icons/io';
import Recommnend from '../components/Recommend';
import {
  getUserAnimeList,
  updateAnimeList,
} from '../styles/utilities/malCalls';

const AnimeInfo = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { animeId } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAnimeInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/anime/get-anime-info`, {
        id: animeId,
        access_token: cookies.mal_access_token,
      });
      console.log(res.data, 'animeanime');
      setAnime(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimeInfo();
  }, [animeId]);

  const addToCurrentWatch = async () => {
    const res = await updateAnimeList(0, animeId);
    const userAnimeList = await getUserAnimeList();
    console.log(userAnimeList, 'addCurrentwatch');
  };
  return (
    <div className="anime-info-container">
      {loading ? (
        <div className="loader">
          <CircularProgress size={100} sx={{ color: '#f75151' }} />
        </div>
      ) : (
        <>
          <IoMdArrowBack
            onClick={() => navigate(-1)}
            size={30}
            className="back-icon"
          />
          <div className="anime-info">
            <div className="img">
              <img src={anime?.main_picture?.large} />
            </div>
            <div className="info">
              <h1>{anime.title}</h1>
              <p className="sub">Total episodes: {anime.num_episodes}</p>
              <p className="main">{anime.synopsis}</p>
              <button onClick={() => addToCurrentWatch()}>
                Add to Current Watching
              </button>
            </div>
          </div>
          <div className="anime-info-divider">
            <hr />
          </div>
          <Recommnend anime={anime} />
        </>
      )}
    </div>
  );
};

export default AnimeInfo;
