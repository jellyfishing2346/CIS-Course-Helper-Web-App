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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <ThemeToggle /> {/* Moved inside Router but outside Header/main */}
        <main>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Authentication routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Academic planning routes */}
            <Route path="/check-prerequisites" element={<CheckPrerequisites />} />
            <Route path="/next-classes" element={<NextClasses />} />
            <Route path="/graduation-requirements" element={<GraduationRequirements />} />
            <Route path="/advising" element={<Advising />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;