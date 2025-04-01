import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect)
      window.location.href = "/dashboard"; // Example redirect
    } catch (error) {
      console.error('Login error:', error.response || error);
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label htmlFor="username" className="input-label">Username</label>
        <input 
          type="text" 
          id="username"
          name="username" 
          value={formData.username}
          onChange={handleChange} 
          className="input-field"
          required 
        />
      </div>
      <div className="input-group">
        <label htmlFor="password" className="input-label">Password</label>
        <input 
          type="password" 
          id="password"
          name="password" 
          value={formData.password}
          onChange={handleChange} 
          className="input-field"
          required 
        />
      </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit" className="login-button">Log In</button>
    </form>
  );
};

export default Login;
