import '../styles/components/currentwatching.scss';
import { FiPlus, FiMinus } from 'react-icons/fi';

const CurrentWatching = () => {
  return (
    <div className="current-watching">
      <div className="cover-img">
        <img src="/assets/images/jjk-cover.jpg" />
      </div>
      <div className="current-anime-info">
        <p className='main'>Jujutsu kaisen</p>
        <p className='sub'>Current Ep : 12</p>
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
