import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token with your backend
      // For now, we'll simulate a logged-in user
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@brooklyn.cuny.edu',
        major: 'Computer Science',
        completedCourses: ['CISC 1115', 'CISC 2210', 'CISC 3115', 'MATH 1201'],
        currentSemester: 'Spring 2025',
        gpa: 3.7,
        graduationYear: '2026'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, send to backend
      if (email.endsWith('@brooklyn.cuny.edu') && password.length >= 6) {
        const mockUser = {
          id: 1,
          name: email.split('@')[0].split('.').map(n => 
            n.charAt(0).toUpperCase() + n.slice(1)
          ).join(' '),
          email: email,
          major: 'Computer Science',
          completedCourses: ['CISC 1115', 'CISC 2210', 'CISC 3115', 'MATH 1201'],
          currentSemester: 'Spring 2025',
          gpa: 3.7,
          graduationYear: '2026'
        };
        
        setUser(mockUser);
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - in real app, send to backend
      const newUser = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        major: formData.major,
        completedCourses: [], // New user starts with no completed courses
        currentSemester: 'Spring 2025',
        gpa: 0.0,
        graduationYear: formData.graduationYear
      };
      
      setUser(newUser);
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
