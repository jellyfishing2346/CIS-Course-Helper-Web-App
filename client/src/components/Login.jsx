import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Consistent environment variable usage (assuming Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      console.log('Login successful:', response.data);

      // *** FIX 1: Handle successful login - Store token securely ***
      // Assuming the backend sends a token in response.data.token
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        // You might also want to store user details like username or role
        // localStorage.setItem('username', response.data.username);
      }

      // *** FIX 2: Use React Router for redirection ***
      navigate("/dashboard"); // Smooth client-side redirect

    } catch (error) {
      console.error('Login error:', error.response || error);
      // Display more specific error message if available from the backend
      setError(error.response?.data?.message || 'An unexpected error occurred during login. Please try again.');
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
      <button 
        type="submit" 
        className="login-button"
        disabled={isLoading} // Disable button during loading
      >
        {isLoading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  );
};

export default Login;