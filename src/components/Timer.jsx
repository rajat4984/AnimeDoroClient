import { useEffect, useState } from "react";
import "../styles/components/timer.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addPomoData } from "../redux/chartSlice/chartSlice";
import { useCookies } from "react-cookie";
const Timer = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const userState = useSelector((store) => store.user);
  const [cookies, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 468px)");
    const handleMediaQueryChange = (event) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery); // Initial check

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  const { pomoTime, music } = useSelector(
    (store) => store.global.popupSettings
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return <div className="timer-left">{`${minutes}:${seconds}`}</div>;
  };

  const playAudio = (audioName) => {
    let audio = new Audio(audioName);
    if (music === "On") audio.play();
  };
  return (
    <div className="timer">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={pomoTime * 60}
        // duration={5}
        colors={" #f35757"}
        strokeLinecap={"round"}
        strokeWidth={6}
        size={isSmallScreen ? 180 : 250}
        trailColor={"#ffcccc"}
        onComplete={() => {
          setIsPlaying(false);
          playAudio("/assets/sounds/bell.wav");
          const paramsObj = {
            userId: userState.user.userId,
            minutes: pomoTime,
            token: cookies.access_token,
          };

          console.log(paramsObj, "paramsObj");

          dispatch(addPomoData(paramsObj));
        }}
      >
        {children}
      </CountdownCircleTimer>

      <div className="timer-btn">
        <div>
          {isPlaying ? (
            <FaPauseCircle
              size={30}
              onClick={() => {
                playAudio("/assets/sounds/btn-click.wav");
                setIsPlaying(false);
              }}
            />
          ) : (
            <FaPlayCircle
              size={30}
              onClick={() => {
                playAudio("/assets/sounds/btn-click.wav");
                setIsPlaying(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
