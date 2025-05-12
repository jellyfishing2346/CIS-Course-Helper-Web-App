// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // While the authentication check is in progress, show a loading indicator
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children (the component for the protected route)
  // `children` is used when the component is used as a wrapper: <ProtectedRoute><MyComponent /></ProtectedRoute>
  // `Outlet` is used when it's a nested route in React Router v6:
  // <Route element={<ProtectedRoute />}> <Route path="xyz" element={<MyComponent />} /> </Route>
  // For our current App.jsx setup, `children` will be passed via the 'element' prop.
  // So we return children directly. If you were using nested routes with <Route element={<ProtectedRoute />}>
  // then you would return <Outlet /> here.
  return children;
};

export default ProtectedRoute;