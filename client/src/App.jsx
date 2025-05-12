// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './globals.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import CheckPrerequisites from './components/CheckPrerequisites';
import NextClasses from './components/NextClass';
import GraduationRequirements from './components/GraduationRequirements';
import Advising from './components/Advising';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AnnouncementsPage from './pages/AnnouncementsPage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Profiles from './components/Profiles';
import { AuthProvider } from './context/AuthContext.jsx'; // Make sure it's .jsx here
import ProtectedRoute from './components/ProtectedRoute.jsx'; // <--- IMPORTANT: Import ProtectedRoute

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider> {/* AuthProvider is now INSIDE the Router */}
          <Header />
          <ThemeToggle />
          <main>
            <Routes>
              {/* Public Routes - Accessible to anyone */}
              <Route path="/" element={<HomePage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes - Only accessible if authenticated */}
              {/* We wrap each protected route with the ProtectedRoute component */}
              <Route path="/dashboard" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> {/* If ProfilePage is distinct and protected */}
              <Route path="/check-prerequisites" element={<ProtectedRoute><CheckPrerequisites /></ProtectedRoute>} />
              <Route path="/next-classes" element={<ProtectedRoute><NextClasses /></ProtectedRoute>} />
              <Route path="/graduation-requirements" element={<ProtectedRoute><GraduationRequirements /></ProtectedRoute>} />
              <Route path="/advising" element={<ProtectedRoute><Advising /></ProtectedRoute>} />
              
            </Routes>
          </main>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;