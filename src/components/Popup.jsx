import { useDispatch, useSelector } from 'react-redux';
import '../styles/components/popup.scss';
import { changePopup, updatePopup } from '../redux/globalSlice/globalSlice';
import { useState } from 'react';
const Popup = () => {
  const { isOpen, theme, music, pomoTime } = useSelector(
    (store) => store.global.popupSettings
  );
  const dispatch = useDispatch();

  const handleOptionsChange = (e) => {
    dispatch(changePopup(e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePopup('save'));
  };
  return (
    <>
      {isOpen && (
        <div className="pop-up">
          <div className="overlay">
            <div className="content">
              <form onSubmit={handleSubmit}>
                <div className="form-item">
                  <label htmlFor="music">Music</label>
                  <select
                    onChange={handleOptionsChange}
                    value={music}
                    name="music"
                    id="music"
                  >
                    <option>On</option>
                    <option>Off</option>
                  </select>
                </div>

                <div className="form-item">
                  <label>Pomo Time</label>
                  <select
                    onChange={handleOptionsChange}
                    value={pomoTime}
                    name="pomoTime"
                  >
                    <option>60</option>
                    <option>45</option>
                    <option>25</option>
                    <option>1</option>
                  </select>
                </div>
                <div className="btn-group">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
