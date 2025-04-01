import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
      console.log('Signup successful:', response.data);
      setSuccess('Signup successful! You can now log in.');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Signup error:', error.response || error);
      setError(error.response?.data?.message || 'An error occurred during signup');
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
        <label htmlFor="email" className="input-label">Email</label>
        <input 
          type="email" 
          id="email"
          name="email" 
          value={formData.email}
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
      {success && <p style={{color: 'green'}}>{success}</p>}
      <button type="submit" className="login-button">Sign Up</button>
    </form>
  );
};

export default Signup;
