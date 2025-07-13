import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthClick = (tab) => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#2c3e50',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🎓 CIS Course Helper
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/course-planner" style={{ color: 'white', textDecoration: 'none' }}>Course Planner</Link>
          <Link to="/prerequisites" style={{ color: 'white', textDecoration: 'none' }}>Prerequisites</Link>
          <Link to="/recommendations" style={{ color: 'white', textDecoration: 'none' }}>AI Recommendations</Link>
          
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#3498db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span>{user?.name?.split(' ')[0] || 'User'}</span>
                <span style={{ fontSize: '12px' }}>▼</span>
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  minWidth: '200px',
                  zIndex: 1000
                }}>
                  <Link 
                    to="/profile" 
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#2c3e50',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                    onClick={() => setShowUserMenu(false)}
                  >
                    👤 View Profile
                  </Link>
                  <Link 
                    to="/course-planner" 
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#2c3e50',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                    onClick={() => setShowUserMenu(false)}
                  >
                    📅 My Course Plan
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      color: '#e74c3c',
                      cursor: 'pointer'
                    }}
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => handleAuthClick('login')}
                style={{
                  background: 'none',
                  border: '1px solid white',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialTab={authTab}
      />
    </>
  );
};

export default Navbar;
