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

function App() {
  const { isOpen } = useSelector((store) => store.global.popupSettings);

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
