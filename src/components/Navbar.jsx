import '../styles/components/navbar.scss';
import { RxLapTimer } from 'react-icons/rx';
import { PiTelevision } from 'react-icons/pi';
import { VscAccount } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopUp } from '../redux/globalSlice/globalSlice';
import { toggleCardPage } from '../redux/chartSlice/chartSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <h1>AnimeDoro</h1>
      </Link>
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
        {userState.user.userId ? (
          <div
            onClick={() => {
              dispatch(toggleCardPage());
            }}
          >
            <span className="mob-links loggedIn">
              {userState.user.username.slice(0, 1).toUpperCase()}
            </span>
            <span className="desktop-links loggedIn">
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
