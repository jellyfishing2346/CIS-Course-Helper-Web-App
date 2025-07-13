import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email, password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/auth/signup', userData);
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
