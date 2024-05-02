import { useState } from 'react';
import '../styles/components/timer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Timer = () => {
  const { pomoTime } = useSelector((store) => store.global.popupSettings);
  const [isPlaying, setIsPlaying] = useState(false);
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return <div className="timer-left">{`${minutes}:${seconds}`}</div>;
  };
  return (
    <div className="timer">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={pomoTime * 60}
        colors={' #f35757'}
        strokeLinecap={'round'}
        strokeWidth={6}
        trailColor={'#ffcccc'}
        onComplete={() => {
          setIsPlaying(false);
          console.log('Pomo Completed');
        }}
      >
        {children}
      </CountdownCircleTimer>

      <div className="timer-btn">
        <div>
          {isPlaying ? (
            <FaPauseCircle size={30} onClick={() => setIsPlaying(false)} />
          ) : (
            <FaPlayCircle size={30} onClick={() => setIsPlaying(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
