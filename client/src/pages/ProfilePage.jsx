import React, { useState } from 'react';
import Signup from "../components/SignUp";
import Login from "../components/Login";
import './ProfilePage.css';

const ProfilePage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="profile-page">
      <h1 className="header">Your Profile</h1>
      <p className="description">Manage your account details here.</p>

      <div className="login-container">
        <h2 className="login-header">{isSignUp ? 'Sign Up' : 'Login to Your Account'}</h2>
        {isSignUp ? <Signup /> : <Login />}
        <p className="sign-up-text">
          {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
        </p>
        <button onClick={() => setIsSignUp(!isSignUp)} className="sign-up-button">
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
