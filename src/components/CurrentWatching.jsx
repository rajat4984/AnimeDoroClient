import { useCookies } from 'react-cookie';
import '../styles/components/currentwatching.scss';
import { FiPlus, FiMinus } from 'react-icons/fi';
import UserProfile from './../Pages/UserProfile';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CurrentWatching = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { animeList } = useSelector((store) => store.user.malUser);
  const [currentWatching, setCurrentWatching] = useState(
    animeList[Object.keys(animeList)[Object.keys(animeList).length - 1]]
  );
  console.log(currentWatching, 'currentWatching');
  return (
    <div className="current-watching">
      <div className="cover-img">
        <img src={currentWatching?.node.main_picture.medium} />
      </div>
      <div className="current-anime-info">
        <p className="sub">Currently watching</p>
        <p className="main">{currentWatching?.node.title}</p>
      </div>
      <div className="btn-container">
        <div>
          <FiMinus />
        </div>
        <div>
          <FiPlus />
        </div>
      </div>
    </div>
  );
};

export default CurrentWatching;
