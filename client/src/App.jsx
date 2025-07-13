import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursePlannerPage from './pages/CoursePlannerPage';
import PrerequisitesPage from './pages/PrerequisitesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import './globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course-planner" element={<CoursePlannerPage />} />
              <Route path="/prerequisites" element={<PrerequisitesPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
