import HomePage from './Pages/HomePage';
import CardPage from './components/CardPage';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <CardPage />
    </>
  );
}

export default App;
