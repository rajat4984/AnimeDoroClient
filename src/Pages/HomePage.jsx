import '../styles/pages/home.scss';
import Timer from '../components/Timer';
import CurrentWatching from '../components/CurrentWatching';
import Popup from '../components/Popup';
import { useSelector } from 'react-redux';
import CardPage from '../components/CardPage';

//TODO - SETUP REACT TOSTIFY ONCE CREATED CONTEXT

const HomePage = () => {
  const { isOpen: chartOpen } = useSelector((store) => store.chart);

  return (
    <div className="home-page">
      <Timer />
      <CurrentWatching />

    
    </div>
  );
};

export default HomePage;
