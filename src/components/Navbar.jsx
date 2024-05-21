import '../styles/components/navbar.scss';
import { RxLapTimer } from 'react-icons/rx';
import { PiTelevision } from 'react-icons/pi';
import { VscAccount } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopUp } from '../redux/globalSlice/globalSlice';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import persistStore from 'redux-persist/es/persistStore';
import { store } from '../redux/store';
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const open = Boolean(anchorEl);
  const persistor = persistStore(store);
  const nagivate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <h1>AnimeDoro</h1>
      </Link>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {cookies.access_token ? (
          <></>
        ) : (
          <MenuItem
            sx={{ color: '#f75151' }}
            onClick={() => {
              handleClose();
            }}
          >
            <Link to="/auth">Pomo Login</Link>
          </MenuItem>
        )}

        <MenuItem
          sx={{ color: '#f75151' }}
          onClick={() => {
            // dispatch(toggleCardPage());
            // dispatch(
            //   getPomoData({
            //     userId: userState.user.userId,
            //     token: cookies.access_token,
            //   })
            // );
            handleClose();
          }}
        >
          <Link to="/userProfile">Account</Link>
        </MenuItem>

        <MenuItem
          sx={{ color: '#f75151' }}
          onClick={() => {
            persistor.purge();
            removeCookie('access_token');
            removeCookie('mal_access_token');
            removeCookie('mal_refresh_token');
            removeCookie('expires_in');
            removeCookie('refresh_token', { path: '/' });
            handleClose();
            nagivate('/auth');
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <div className="nav-links">
        <div>
          <Link to="/" className="mob-links">
            <RxLapTimer />
          </Link>
          <Link to="/" className="desktop-links">
            Pomo
          </Link>
        </div>

        <div>
          <Link to="/anime" className="mob-links">
            <PiTelevision />
          </Link>
          <Link to="/anime" className="desktop-links">
            Anime
          </Link>
        </div>
      </div>

      <div className="nav-links">
        <div
          onClick={() => {
            dispatch(togglePopUp());
          }}
        >
          <span className="mob-links">
            <IoSettingsOutline />
          </span>
          <span className="desktop-links">Settings</span>
        </div>

        {cookies.access_token ? (
          <div>
            <span onClick={handleClick} className="mob-links loggedIn">
              {userState.user.username.slice(0, 1).toUpperCase()}
            </span>
            <span onClick={handleClick} className="desktop-links loggedIn">
              {userState.user.username.slice(0, 1).toUpperCase()}
            </span>
          </div>
        ) : cookies.mal_access_token ? (
          <div>
            <span onClick={handleClick} className="mob-links">
              <img src={userState?.malUser?.picture} />
            </span>
            <span onClick={handleClick} className="desktop-links">
              <img src={userState?.malUser?.picture} />
            </span>
          </div>
        ) : (
          <div>
            <Link to="/auth" className="mob-links">
              <VscAccount />
            </Link>
            <Link to="/auth" className="desktop-links">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
