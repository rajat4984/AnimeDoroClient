import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import '../styles/pages/userProfile.scss';
import { GrPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../components/BarChart';
import ProfileChart from './../components/ProfileChart';
import { useCookies } from 'react-cookie';
import { getPomoData } from '../redux/chartSlice/chartSlice';
import toast, { Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { store } from '../redux/store';

const UserProfile = () => {
  const { data: chartData } = useSelector((store) => store.chart);
  const [start, setStart] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [end, setEnd] = useState(7);
  const [malSwitch, setMalSwitch] = useState(
    cookies.mal_access_token ? 'mal' : 'pomo'
  );
  const [firstSevenData, setFirstSevenData] = useState(
    chartData?.pomoData?.slice(start, end)
  );
  const animeStats = useSelector(
    (store) => store.user.malUser.anime_statistics
  );
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.user.user);
  const nagivate = useNavigate();
  const persistor = persistStore(store);

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
    const getData = async () => {
      const res = await dispatch(
        getPomoData({ userId, token: cookies.access_token })
      );

      if (res.payload === 'Access Token expired') {
        setTimeout(() => {
          persistor.purge();
          removeCookie('access_token');
          removeCookie('mal_access_token');
          removeCookie('mal_refresh_token');
          removeCookie('expires_in');
          removeCookie('refresh_token', { path: '/' })
          nagivate('/auth');
        }, 2000);
        toast.error(`${res.payload} please login again`, {
          duration: 2000,
          style: {
            color: '#f75151',
          },
        });
      }
    };
    if (cookies.access_token) {
      getData();
    }
  }, []);

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
      <Toaster position="bottom-right" reverseOrder={true} />
      {cookies.mal_access_token && <Profile />}

      <div className="anime-info-divider">
        <hr />
      </div>
      <div className="flex">
        <div className="switch">
          <div className="mal">
            <input
              defaultChecked={malSwitch === 'mal' ? true : false}
              id="mal"
              type="radio"
              name="profile-type"
            />
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
            <input
              defaultChecked={malSwitch === 'pomo' ? true : false}
              id="pomo"
              type="radio"
              name="profile-type"
            />
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
