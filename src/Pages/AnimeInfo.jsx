import axios from 'axios';
import '../styles/pages/animeInfo.scss';
import React, { useEffect, useState, useTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material';
import { getAnimeInfo } from './../styles/utilities/malCalls';
import { IoMdArrowBack } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import Recommnend from '../components/Recommend';
import { setCurrentWatching } from '../redux/userSlice/userSlice';
import { useDispatch } from 'react-redux';

const AnimeInfo = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { animeId } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPageAnimeInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/anime/get-anime-info`, {
        id: animeId,
        access_token: cookies.mal_access_token,
      });
      setAnime(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageAnimeInfo();
  }, [animeId]);

  const addToCurrentWatch = async () => {
    const res = await getAnimeInfo({
      animeId,
      token: cookies.mal_access_token,
    });

    dispatch(setCurrentWatching(res));
    toast.success('Anime Added to Current Watching!', {
      duration: 2000,
      style: {
        color: '#f75151',
      },
    });
  };
  return (
    <div className="anime-info-container">
      <Toaster position="bottom-right" reverseOrder={true} />
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
