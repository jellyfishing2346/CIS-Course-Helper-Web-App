import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SignupForm = ({ onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: 'Computer Science',
    graduationYear: '2026'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!formData.email.endsWith('@brooklyn.cuny.edu')) {
      setError('Please use your Brooklyn College email address');
      setLoading(false);
      return;
    }

    try {
      const result = await signup(formData);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Signup failed');
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
      maxWidth: '450px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2c3e50' }}>
        🎓 Join CIS Course Helper
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
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
        </div>

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Major
            </label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Computer Information Systems">Computer Information Systems</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Expected Graduation
            </label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="2025">Spring 2025</option>
              <option value="2025-fall">Fall 2025</option>
              <option value="2026">Spring 2026</option>
              <option value="2026-fall">Fall 2026</option>
              <option value="2027">Spring 2027</option>
              <option value="2027-fall">Fall 2027</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
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
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
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
            backgroundColor: loading ? '#bdc3c7' : '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0.5rem 0', color: '#7f8c8d' }}>
          Already have an account?{' '}
          <button
            onClick={switchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
