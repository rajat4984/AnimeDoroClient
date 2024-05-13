import '../styles/pages/authentication.scss';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = () => {
  const [formSwitch, setFormSwitch] = useState('login');
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.access_token)
    navigate('/')
  }, []);

  return (
    <div className="authentication-page">
      <div>
        <div className="auth-switch">
          <div className="login">
            <input defaultChecked id="login" type="radio" name="auth" />
            <label onClick={() => setFormSwitch('login')} htmlFor="login">
              Login
            </label>
          </div>
          <div className="signup">
            <input id="signup" type="radio" name="auth" />
            <label onClick={() => setFormSwitch('signup')} htmlFor="signup">
              Signup
            </label>
          </div>
        </div>
        {formSwitch === 'login' ? (
          <LoginForm />
        ) : (
          <SignupForm setFormSwitch={setFormSwitch} />
        )}
      </div>
      <div className="image">
        <img src="/assets/images/authImage.svg" />
      </div>
    </div>
  );
};

export default AuthenticationPage;
