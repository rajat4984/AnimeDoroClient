import '../styles/components/signup.scss';
import {
  MdAlternateEmail,
  MdOutlineLock,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

const signupForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
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

      setShowOtp(true);
    } catch (error) {
      toast.error(error.response.data, {
        duration: 2000,
        style: {
          color: '#f75151',
        },
      });
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(registerForm));
    if (res.type === '/auth/register/fulfilled') {
      navigate('/');
    }
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
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
    </>
  );
};

export default signupForm;
