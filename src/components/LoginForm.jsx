import '../styles/components/login.scss';
import { MdAlternateEmail } from 'react-icons/md';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(loginForm));
    if (res.type === '/auth/login/fulfilled') {
      toast.success('Logged In!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
