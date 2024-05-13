import { useDispatch, useSelector } from 'react-redux';
import AuthenticationPage from './Pages/AuthenticationPage';
import HomePage from './Pages/HomePage';
import CardPage from './components/CardPage';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popup from './components/Popup';
import { useEffect } from 'react';
import { getPomoData } from './redux/chartSlice/chartSlice';
import { useCookies } from 'react-cookie';

function App() {
  const { isOpen } = useSelector((store) => store.global.popupSettings);
  const userState = useSelector((store) => store.user);
  const [cookies, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPomoData({
        userId: userState.user.userId,
        token: cookies.accessToken,
      })
    );
  }, []);

  const popupVariants = {
    open: { opacity: 1 },
    close: { opacity: 0 },
  };
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <motion.div variants={popupVariants} animate={isOpen ? 'open' : 'close'}>
        <Popup />
      </motion.div>

      <CardPage />
    </>
  );
}

export default App;
