import React, { useState } from 'react';
import axios from 'axios';

// Consistent environment variable usage (assuming Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
      console.log('Signup successful:', response.data);
      setSuccess('Signup successful! You can now log in.');
      setFormData({ username: '', email: '', password: '' }); // Clear form on success
    } catch (error) {
      console.error('Signup error:', error.response || error);
      // Display more specific error message if available from the backend
      setError(error.response?.data?.message || 'An unexpected error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false after request completes
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
          disabled={isLoading} // Disable input during loading
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
          disabled={isLoading} // Disable input during loading
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
          disabled={isLoading} // Disable input during loading
        />
      </div>
      {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
      {success && <p style={{color: 'green', marginTop: '10px'}}>{success}</p>}
      <button 
        type="submit" 
        className="login-button"
        disabled={isLoading} // Disable button during loading
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Signup;