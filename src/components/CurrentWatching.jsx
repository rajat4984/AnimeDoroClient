import { useCookies } from 'react-cookie';
import '../styles/components/currentwatching.scss';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateAnimeList } from '../styles/utilities/malCalls';

const CurrentWatching = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { animeList } = useSelector((store) => store.user.malUser);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const { currentWatching } = useSelector((store) => store.user.malUser);

  // useEffect(() => {
  //   const getEpisode = async () => {
  //     const res = await updateAnimeList(0);
  //     console.log(res, 'resres');
  //   };

  //   getEpisode();
  // }, []);
  return (
    <>
      {currentWatching && (
        <div className="current-watching">
          <div className="cover-img">
            <img src={currentWatching.anime.main_picture.medium} />
          </div>
          <div className="current-anime-info">
            <p className="main">{currentWatching.anime.title}</p>
            <p className="sub">
              {currentWatching.anime.num_episodes_watched
                ? currentWatching.anime.num_episodes_watched
                : 0}
              /{currentWatching.totalEp}
            </p>
          </div>
          <div className="btn-container">
            <div>
              <FiMinus onClick={() => prevEpisode()} />
            </div>
            <div>
              <FiPlus onClick={() => nextEpisode()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWatching;
