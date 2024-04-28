import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { IoPlayOutline, IoPauseOutline } from 'react-icons/io5';
import { FaPlayCircle } from "react-icons/fa";

const Timer = () => {
  return (
    <div className="timer">
      <CountdownCircleTimer
        isPlaying
        duration={7}
        colors={' #f35757'}
        onComplete={() => {
          console.log('Pomo Completed');
        }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>

      <div>
        <div>
          <FaPlayCircle />
          {/* <IoPauseOutline /> */}
        </div>
      </div>
    </div>
  );
};

export default Timer;
