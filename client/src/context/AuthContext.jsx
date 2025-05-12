// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // <--- NEW: Import jwtDecode

// Create the Auth Context
const AuthContext = createContext(null);

// Define your API base URL (consistent with Login/Signup)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // To indicate if initial authentication check is complete
  const navigate = useNavigate();

  // Effect to check for token in localStorage on initial app load
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken); // <--- NEW: Decode the token
        // Check if token is expired (optional but good practice)
        if (decodedUser.exp * 1000 < Date.now()) {
          console.log("Token expired, logging out.");
          logout(); // Use the logout function
        } else {
          setToken(storedToken);
          setUser(decodedUser); // <--- NEW: Set actual decoded user data
        }
      } catch (error) {
        console.error("Error decoding token or token invalid:", error);
        logout(); // If token is invalid, log out
      }
    }
    setLoading(false); // Authentication check is complete
  }, []); // Empty dependency array: runs only once on mount

  // Function to handle user login
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
      const { token } = response.data; // Backend sends user data directly in user field, not in token payload itself
      const userData = response.data.user; // Get the user object sent from backend

      if (token) {
        localStorage.setItem('userToken', token);
        setToken(token);
        setUser(userData); // Set user data from backend response
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.response || error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('userToken');
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('userToken');
    navigate("/login"); // Redirect to login page after logout
  };

  // The value provided to children components
  const authContextValue = {
    user,
    token,
    isAuthenticated: !!user && !!token, // Derived state: true if user and token exist
    loading, // Pass loading state
    login,
    logout,
  };

  // Render children only after the initial authentication check is complete
  // This prevents ProtectedRoute from redirecting before auth state is known
  if (loading) {
    return <div>Authenticating...</div>; // Or a spinner/loading screen
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};