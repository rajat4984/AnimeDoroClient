import { useSelector } from 'react-redux';
import AuthenticationPage from './Pages/AuthenticationPage';
import HomePage from './Pages/HomePage';
import CardPage from './components/CardPage';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { isOpen } = useSelector((store) => store.global.popupSettings);

  return (
    <>
      <Navbar />
      {/* <HomePage /> */}
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>

      {isOpen && <Popup />}

      <CardPage />
    </>
  );
}

export default App;
