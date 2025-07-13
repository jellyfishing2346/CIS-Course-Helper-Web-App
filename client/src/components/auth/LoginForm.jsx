import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm = ({ onClose, switchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2c3e50' }}>
        🎓 Welcome Back
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: '#fdf2f2',
          color: '#e74c3c',
          padding: '0.75rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          border: '1px solid #fadada'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Brooklyn College Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.name@brooklyn.cuny.edu"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading ? '#bdc3c7' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0.5rem 0', color: '#7f8c8d' }}>
          Don't have an account?{' '}
          <button
            onClick={switchToSignup}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Sign up here
          </button>
        </p>
        <Link to="/forgot-password" style={{ color: '#3498db', fontSize: '0.9rem' }}>
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
