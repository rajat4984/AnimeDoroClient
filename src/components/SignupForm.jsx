import '../styles/components/signup.scss';
import {
  MdAlternateEmail,
  MdOutlineLock,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

const signupForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showOtp, setShowOtp] = useState(true);
  const [registerForm, setRegisterForm] = useState({
    email: '',
    username: '',
    password: '',
    otp: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/sendOtp', {
        email: registerForm.email,
      });
      console.log(res, 'otp send res');
      setShowOtp(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(registerForm));
    console.log(res, 'res');
    if (res.type === '/auth/register/fulfilled') {
      navigate('/');
    }
  };
  return (
    <div className="login-form">
      <form onSubmit={showOtp ? handleRegister : sendOtp}>
        <div className="form-item">
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={registerForm.email}
            required
            onChange={handleChange}
          ></input>
          <MdAlternateEmail className="icon" />
        </div>
        <div className="form-item">
          <input
            value={registerForm.username}
            name="username"
            placeholder="Username"
            maxLength={10}
            type="text"
            required
            onChange={handleChange}
          ></input>
          <MdOutlineAccountCircle className="icon" />
        </div>
        <div className="form-item">
          <input
            onChange={handleChange}
            value={registerForm.password}
            name="password"
            placeholder="Password"
            type={`${showPass ? 'text' : 'password'}`}
            maxLength={8}
          ></input>
          {showPass ? (
            <FaRegEye className="icon" onClick={() => setShowPass(!showPass)} />
          ) : (
            <FaRegEyeSlash
              className="icon"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
        {showOtp && (
          <div className="form-item">
            <input
              required
              placeholder="OTP"
              type="text"
              maxLength={4}
              name="otp"
              value={registerForm.otp}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            ></input>
            <MdOutlineLock className="icon" />
          </div>
        )}

        {showOtp ? (
          <button type="submit">Signup</button>
        ) : (
          <button type="submit">Send Otp</button>
        )}
      </form>
    </div>
  );
};

export default signupForm;
