import '../styles/components/navbar.scss';
import { RxLapTimer } from 'react-icons/rx';
import { PiTelevision } from 'react-icons/pi';
import { RxSpeakerLoud } from 'react-icons/rx';
import { VscAccount } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <nav className="navbar">
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
      <div className="brand">
        <h1>AnimeDoro</h1>
      </div>
      <div className="nav-links">
        <div>
          <span className="mob-links">
            <IoSettingsOutline />
          </span>
          <span className="desktop-links">Settings</span>
        </div>
        <div>
          <span className="mob-links">
            <VscAccount />
          </span>
          <span className="desktop-links">Account</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
