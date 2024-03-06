import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log(credentials);
      const response = await API.post('/auth/sign_in', credentials);
      console.log(response.headers['access-token']);
      if (response.headers['access-token']) {
        localStorage.setItem('authToken', response.headers['access-token']);
        localStorage.setItem('client', response.headers['client']);
        localStorage.setItem('uid', response.headers['uid']);
        login();
        navigate('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
       console.error('Login error:', error.response || error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;