import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const userInfo = { username, password };
    login(userInfo);
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          type='text'
          value={username}
          id='username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          id='password'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id='login-btn' type='submit'>login</button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginForm;