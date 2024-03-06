import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

function Signup() {
  const [userDetails, setUserDetails] = useState({ email: '', password: '', passwordConfirmation: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.passwordConfirmation) {
      alert('Passwords do not match.');
      return;
    }
    try {
      await API.post('/auth', { ...userDetails, confirm_success_url: '/' });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={userDetails.password} onChange={handleChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="passwordConfirmation" value={userDetails.passwordConfirmation} onChange={handleChange} />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;