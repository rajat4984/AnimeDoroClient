import { useDispatch, useSelector } from 'react-redux';
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
import { getAccessToken, getProfileInfo, getUserAnimeList } from './styles/utilities/malCalls';
import { setMalUser } from './redux/userSlice/userSlice';
import { useCookies } from 'react-cookie';
import AnimeList from './Pages/AnimeList';
import AnimeInfo from './Pages/AnimeInfo';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const { isOpen } = useSelector((store) => store.global.popupSettings);
  const [cookies, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
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
        const tokenResponse = await getAccessToken(convertedArr); 
        setCookie('mal_access_token', tokenResponse.data.access_token);
        setCookie('mal_refresh_token', tokenResponse.data.refresh_token);
        setCookie('expires_in', tokenResponse.data.expires_in);

        const profileResponse = await getProfileInfo();
        const userAnimeList =   await getUserAnimeList();
        dispatch(setMalUser(profileResponse.data));
    
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
        <Route path="/animeSearch/:animeName" element={<AnimeList />} />
        <Route path="anime/:animeId" element={<AnimeInfo />} />
      </Routes>
      {/* <Footer/> */}

      <motion.div variants={popupVariants} animate={isOpen ? 'open' : 'close'}>
        <Popup />
      </motion.div>

      <CardPage />
    </>
  );
}

export default App;
