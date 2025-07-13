import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#7f8c8d',
            zIndex: 1001
          }}
        >
          ×
        </button>

        {activeTab === 'login' ? (
          <LoginForm 
            onClose={onClose} 
            switchToSignup={() => setActiveTab('signup')} 
          />
        ) : (
          <SignupForm 
            onClose={onClose} 
            switchToLogin={() => setActiveTab('login')} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
