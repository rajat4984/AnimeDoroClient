import '../styles/pages/home.scss';
import Timer from '../components/Timer';
import CurrentWatching from '../components/CurrentWatching';
import Popup from '../components/Popup';
import { useSelector } from 'react-redux';
import CardPage from '../components/CardPage';
import { useEffect } from 'react';

//TODO - SETUP REACT TOSTIFY ONCE CREATED CONTEXT

const HomePage = () => {
  const { isOpen: chartOpen } = useSelector((store) => store.chart);

  // useEffect(()=>{
    // window.addEventListener('beforeunload',alertUser);

  //   return ()=>{
  //     window.addEventListener('beforeunload',alertUser);
  //   }
  // })

  // const alertUser = ()=>{

  // }

  return (
    <div className="home-page">
      <Timer />
      <CurrentWatching />
    
    </div>
  );
};

export default HomePage;
