import { useSelector } from 'react-redux';
import AuthenticationPage from './Pages/AuthenticationPage';
import HomePage from './Pages/HomePage';
import CardPage from './components/CardPage';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popup from './components/Popup';
import AnimePage from './Pages/AnimePage';
import { useEffect } from 'react';
import { getAccessToken, getProfileInfo } from './styles/utilities/malCalls';

function App() {
  const { isOpen } = useSelector((store) => store.global.popupSettings);
  const handleCodeChallenge = async () => {
    function dec2hex(dec) {
      return ('0' + dec.toString(16)).substr(-2);
    }

    function generateRandomString() {
      let array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec2hex).join('');
    }

    const challenge = generateRandomString();

    if (!sessionStorage.getItem('codeChallenge')) {
      sessionStorage.setItem('codeChallenge', challenge);
    }
    // setCodeChallenge(challenge); //code challenge and verifier are same in this authentication
  };
  useEffect(() => {
    // for getting token from mal server
    const getToken = async () => {
      const arr = window.location.search.split('&');
      const convertedArr = arr.map((item) => {
        item = item.split('=');
        item = item[1];
        return item;
      });

      if (convertedArr[0] !== undefined) {
        const tokenResponse = await getAccessToken(convertedArr); //call for getting access token
        sessionStorage.setItem('access_token', tokenResponse.data.access_token);
        sessionStorage.setItem(
          'refresh_token',
          tokenResponse.data.refresh_token
        );
        sessionStorage.setItem('expires_in', tokenResponse.data.expires_in);

        const profileResponse = await getProfileInfo();
        sessionStorage.setItem('User', JSON.stringify(profileResponse.data));

        // dispatch(loginSuccess(JSON.parse(sessionStorage.getItem("User"))));
      } else {
        // dispatch(loginSuccess(JSON.parse(sessionStorage.getItem("User"))));
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    handleCodeChallenge();
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
        <Route path="/anime" element={<AnimePage />} />
      </Routes>

      <motion.div variants={popupVariants} animate={isOpen ? 'open' : 'close'}>
        <Popup />
      </motion.div>

      <CardPage />
    </>
  );
}

export default App;
