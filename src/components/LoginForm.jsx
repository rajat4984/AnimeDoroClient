import '../styles/components/login.scss';
import { MdAlternateEmail } from 'react-icons/md';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const { isLoading } = useSelector((store) => store.user);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(loginForm));
    if (res.type === '/auth/login/fulfilled') {
      setCookie('access_token', res.payload.headers.authorization);
      toast.success('Logged In!');

      navigate('/');
    } else {
      toast.error(res.payload, {
        duration: 2000,
        style: {
          color: '#f75151',
        },
      });
    }
  
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="login-form">
        <form onSubmit={handleLogin} method={'POST'}>
          <div className="form-item">
            <input
              placeholder="Email"
              onChange={handleChange}
              value={loginForm.email}
              name="email"
              type="email"
              required
            ></input>
            <MdAlternateEmail className="icon" />
          </div>
          <div className="form-item">
            <input
              onChange={handleChange}
              value={loginForm.password}
              name="password"
              placeholder="Password"
              required
              type={`${showPass ? 'text' : 'password'}`}
            ></input>
            {showPass ? (
              <FaRegEye
                className="icon"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <FaRegEyeSlash
                className="icon"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
          {isLoading ? (
            <CircularProgress sx={{ color: '#f75151' }} />
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
