import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import '../styles/pages/userProfile.scss';
import { GrPrevious } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import BarChart from '../components/BarChart';
import ProfileChart from './../components/ProfileChart';
import { useCookies } from 'react-cookie';

const UserProfile = () => {
  const { data: chartData } = useSelector((store) => store.chart);
  const [start, setStart] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [end, setEnd] = useState(7);
  const [malSwitch, setMalSwitch] = useState('pomo');
  const [firstSevenData, setFirstSevenData] = useState(
    chartData?.pomoData?.slice(start, end)
  );
  const animeStats = useSelector(
    (store) => store.user.malUser.anime_statistics
  );
  // const [pomoData,setPomoData] = useState()
  console.log(animeStats, 'usingstate');

  let malData = {
    labels: [
      'Mean score',
      'Total days',
      'Days watched',
      'Items completed',
      'Items watching',
    ],
    datasets: [
      {
        label: 'Mal Stats',
        data: [
          animeStats?.mean_score,
          animeStats?.num_days,
          animeStats?.num_days_watched,
          animeStats?.num_items_completed,
          animeStats?.num_items_watching,
        ],
        borderColor: '#dd5353',
        borderWidth: 1,
        backgroundColor: '#ffcccc',
        barThickness: 20,
        hoverBackgroundColor: '#dd5353',
      },
    ],
  };

  useEffect(() => {
    setFirstSevenData(chartData?.pomoData?.slice(start, end));
  }, [start, end]);
  const handleNext = () => {
    if (end < Data.length - 1) {
      setStart((prev) => prev + 1);
      setEnd((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (start > 0) {
      setStart((prev) => prev - 1);
      setEnd((prev) => prev - 1);
    }
  };
  return (
    <div className="user-profile">
      {malSwitch === 'pomo' ? <></> : <Profile />}

      <div className="anime-info-divider">
        <hr />
      </div>
      <div className="flex">
        <div className="switch">
          <div className="mal">
            <input id="mal" type="radio" name="profile-type" />
            <label
              style={
                cookies.mal_access_token
                  ? {}
                  : { pointerEvents: 'none', opacity: '0.5' }
              }
              onClick={() => setMalSwitch('mal')}
              htmlFor="mal"
            >
              Mal
            </label>
          </div>
          <div className="pomo">
            <input defaultChecked id="pomo" type="radio" name="profile-type" />
            <label
              style={
                cookies.access_token
                  ? {}
                  : { pointerEvents: 'none', opacity: '0.5' }
              }
              onClick={() => setMalSwitch('pomo')}
              htmlFor="pomo"
            >
              Pomo
            </label>
          </div>
        </div>

        {malSwitch === 'pomo' ? (
          <div className="btn-group">
            <GrPrevious className="prev-btn" onClick={handlePrev} size={10} />
            <GrPrevious className="next-btn" onClick={handleNext} size={10} />
          </div>
        ) : (
          <></>
        )}
      </div>

      {malSwitch === 'pomo' ? (
        <BarChart data={firstSevenData} />
      ) : (
        <>
          <ProfileChart data={malData} />
        </>
      )}
    </div>
  );
};

export default UserProfile;