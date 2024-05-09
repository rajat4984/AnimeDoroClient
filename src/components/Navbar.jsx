import '../styles/components/navbar.scss';
import { RxLapTimer } from 'react-icons/rx';
import { PiTelevision } from 'react-icons/pi';
import { VscAccount } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopUp } from '../redux/globalSlice/globalSlice';
import { getPomoData, toggleCardPage } from '../redux/chartSlice/chartSlice';
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
        <MenuItem
          sx={{ color: '#f75151' }}
          onClick={() => {
            dispatch(toggleCardPage());
            dispatch(
              getPomoData({
                userId: userState.user.userId,
                token: cookies.accessToken,
              })
            );
            handleClose();
          }}
        >
          Stats
        </MenuItem>

        <MenuItem
          sx={{ color: '#f75151' }}
          onClick={() => {
            persistor.purge();
            removeCookie('accessToken');
            removeCookie('refreshToken', { path: '/' });
            handleClose();
            nagivate('/auth');
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <div className="nav-links">
        <div>
          <span className="mob-links">
            <RxLapTimer />
          </span>
          <span className="desktop-links">Pomo</span>
        </div>

        <div>
          <span className="mob-links">
            <PiTelevision />
          </span>
          <span className="desktop-links">Anime</span>
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
        {cookies.accessToken ? (
          <div>
            <span onClick={handleClick} className="mob-links loggedIn">
              {userState.user.username.slice(0, 1).toUpperCase()}
            </span>
            <span onClick={handleClick} className="desktop-links loggedIn">
              {userState.user.username.slice(0, 1).toUpperCase()}
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
