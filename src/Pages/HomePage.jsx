import '../styles/pages/home.scss';
import Timer from '../components/Timer';
import CurrentWatching from '../components/CurrentWatching';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const HomePage = () => {
  const { isOpen: chartOpen } = useSelector((store) => store.chart);
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <div className="home-page">
      <Timer />
      {cookies.mal_access_token && <CurrentWatching />}
    </div>
  );
};

export default HomePage;
