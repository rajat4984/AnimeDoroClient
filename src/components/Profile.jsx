import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userState = useSelector((store) => store.user);
  return (
    <div className="profile">
      <div className='img-container'>
        <img src={userState?.malUser?.picture} />
      </div>
      <div>
        <p>
          Name : <span>{userState?.malUser?.name}</span>
        </p>
        <p>
          Joined :{' '}
          <span>{  format(userState?.malUser?.joined_at, 'dd MMM yyy')}</span>
        </p>
        <p>
          Total Ep watched :{' '}
          <span>{userState?.malUser?.anime_statistics.num_episodes}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
