import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '2rem',
      marginTop: '2rem' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ marginTop: 0 }}>CIS Course Helper</h3>
          <p>Your guide to Brooklyn College Computer Science courses</p>
        </div>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/course-planner" style={{ color: 'white', textDecoration: 'none' }}>Course Planner</Link>
            <Link to="/prerequisites" style={{ color: 'white', textDecoration: 'none' }}>Prerequisites</Link>
            <Link to="/recommendations" style={{ color: 'white', textDecoration: 'none' }}>AI Recommendations</Link>
          </div>
        </div>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4>Information</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
            <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
          </div>
        </div>
      </div>
      
      <div style={{ 
        borderTop: '1px solid #34495e',
        marginTop: '1rem',
        paddingTop: '1rem',
        textAlign: 'center' 
      }}>
        <p>&copy; 2025 Brooklyn College CIS Course Helper. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
