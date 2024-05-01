import '../styles/pages/home.scss';
import Timer from '../components/Timer';
import CurrentWatching from '../components/CurrentWatching';
import { useState } from 'react';
import Popup from '../components/Popup';

//TODO - SETUP REACT TOSTIFY ONCE CREATED CONTEXT

const HomePage = () => {
  const [popupSettings, setPopupSettings] = useState({
    isOpen: false,
    theme: 'light',
    music: 'On',
    pomoTime: 25,
  });
  return (
    <div className="home-page">
      <Timer
        popupSettings={popupSettings}
        setPopupSettings={setPopupSettings}
      />
      <CurrentWatching
        popupSettings={popupSettings}
        setPopupSettings={setPopupSettings}
      />
      <Popup
        popupSettings={popupSettings}
        setPopupSettings={setPopupSettings}
      />
    </div>
  );
};

export default HomePage;
