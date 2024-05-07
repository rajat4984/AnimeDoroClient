import { useSelector } from 'react-redux';
import AuthenticationPage from './Pages/AuthenticationPage';
import HomePage from './Pages/HomePage';
import CardPage from './components/CardPage';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popup from './components/Popup';

function App() {
  const { isOpen } = useSelector((store) => store.global.popupSettings);
  window.addEventListener("beforeunload", (ev) => 
  {  
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';
  });
  return (
    <>
      <Navbar />
      {/* <HomePage /> */}

      <Routes>
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      {isOpen && <Popup />}

      <CardPage />
    </>
  );
}

export default App;
