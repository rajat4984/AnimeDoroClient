import '../styles/components/login.scss';
import { MdAlternateEmail } from 'react-icons/md';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

import { useState } from 'react';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login-form">
      <form>
        <div className="form-item">
          <input placeholder="Email" type="email" required></input>
          <MdAlternateEmail className="icon" />
        </div>
        <div className="form-item">
          <input
            placeholder="Password"
            required
            type={`${showPass ? 'text' : 'password'}`}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
