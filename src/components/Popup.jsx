import { useState } from 'react';
import '../styles/components/popup.scss';
import { IoClose } from 'react-icons/io5';
const Popup = ({ popupSettings, setPopupSettings }) => {
  const handleOptionsChange = (e) => {
    setPopupSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupSettings((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <>
      {popupSettings.isOpen && (
        <div className="pop-up">
          <div className="overlay">
            <div className="content">
              <IoClose
                className="close-btn"
                onClick={() => {
                  setPopupSettings({
                    isOpen: false,
                    theme: 'light',
                    music: 'On',
                    pomoTime: 25,
                  });
                }}
              />
              <form onSubmit={handleSubmit}>
                <div className="form-item">
                  <label for="music">Music</label>
                  <select
                  value={popupSettings.music}
                    name="music"
                    id="music"
                    onChange={handleOptionsChange}
                  >
                    <option>On</option>
                    <option>Off</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Theme</label>
                  <select  value={popupSettings.theme} name="theme" onChange={handleOptionsChange}>
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Pomo Time</label>
                  <select value={popupSettings.pomoTime} name="pomoTime" onChange={handleOptionsChange}>
                    <option>60</option>
                    <option>45</option>
                    <option>25</option>
                  </select>
                </div>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
