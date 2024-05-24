import { useCookies } from 'react-cookie';
import '../styles/components/currentwatching.scss';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateAnimeList } from '../styles/utilities/malCalls';
import {
  setCurrentWatching,
  updateCurrentWatching,
} from '../redux/userSlice/userSlice';

const CurrentWatching = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { currentWatching } = useSelector((store) => store.user.malUser);
  console.log(currentWatching, 'currentWatching');
  const [currentEpisode, setCurrentEpisode] = useState(
    currentWatching?.anime?.num_episodes_watched
  );
  const dispatch = useDispatch();
  const prevEpisode = async () => {
    if (currentWatching?.anime?.num_episodes_watched >= 0) {
      console.log('Helloe');
      let updatedEpisode = currentWatching?.anime?.num_episodes_watched - 1;
      setCurrentEpisode(updatedEpisode);
      const res = await updateAnimeList(
        updatedEpisode,
        currentWatching.anime.id
      );
      console.log(res,'resresres')
      dispatch(updateCurrentWatching(res.data.num_episodes_watched));
    }
  };

  const nextEpisode = async () => {
    if (
      currentWatching?.anime?.num_episodes_watched < currentWatching?.totalEp
    ) {
      let updatedEpisode = currentWatching?.anime?.num_episodes_watched + 1;
      setCurrentEpisode(updatedEpisode);
      const res = await updateAnimeList(
        updatedEpisode,
        currentWatching.anime.id
      );
      dispatch(updateCurrentWatching(res.data.num_episodes_watched));
    }
  };
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
              Current Ep: {currentWatching.anime.num_episodes_watched
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
