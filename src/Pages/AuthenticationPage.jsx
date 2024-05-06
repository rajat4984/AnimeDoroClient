import '../styles/pages/authentication.scss';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useState } from 'react';

const AuthenticationPage = () => {
  const [formSwitch, setFormSwitch] = useState('login');

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
        {formSwitch === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
      <div className='image'>
        <img src="/assets/images/authImage.svg" />
      </div>
    </div>
  );
};

export default AuthenticationPage;
