import HomePage from './Pages/HomePage';
import CardPage from './components/CardPage';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      {/* <Popup/> */}
      <CardPage />
    </>
  );
}

export default App;
