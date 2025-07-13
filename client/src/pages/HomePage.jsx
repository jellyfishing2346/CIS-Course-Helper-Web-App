import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';
import QuickLinks from '../components/QuickLinks';
import Announcements from '../components/Announcements';
import Footer from '../components/Footer';
import AuthModal from '../components/auth/AuthModal';
import './HomePage.css';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Brooklyn College CIS Course Helper</h1>
          <p>Plan your computer science journey with intelligent course recommendations</p>
          
          {isAuthenticated ? (
            <div>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                Welcome back, {user?.name}! 👋
              </p>
              
              {/* Fixed spacing for action links */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link 
                  to="/course-planner" 
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#2ecc71',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'transform 0.3s, background-color 0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.backgroundColor = '#27ae60';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.backgroundColor = '#2ecc71';
                  }}
                >
                  Continue Planning
                </Link>
                
                <Link 
                  to="/prerequisites" 
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'transparent',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    border: '2px solid white',
                    transition: 'transform 0.3s, background-color 0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Check Prerequisites
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                Join thousands of Brooklyn College students planning their academic success
              </p>
              <div className="hero-actions">
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="cta-button primary"
                >
                  Get Started Free
                </button>
                <Link to="/about" className="cta-button secondary">
                  Learn More
                </Link>
              </div>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.8 }}>
                ✨ Free for all Brooklyn College students
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="home-content">
        <SearchBar />
        <QuickLinks />
        <Announcements />
      </main>

      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialTab="signup"
      />
    </div>
  );
};

export default HomePage;
