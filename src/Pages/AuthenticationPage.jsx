import "../styles/pages/authentication.scss";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const AuthenticationPage = () => {
  return (
    <div className='authentication-page'>
      <div className="auth-switch">
        <div className="login">
          <input checked id='login' type="radio" name="auth" />
          <label   htmlFor="login">Login</label>
        </div>
        <div className="signup">
          <input id='signup' type="radio" name="auth" />
          <label htmlFor="signup">Signup</label>
        </div>
      </div>
      {/* <LoginForm/> */}
        <SignupForm/>
    </div>
  );
};

export default AuthenticationPage;
