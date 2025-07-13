import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const links = [
    {
      title: '📚 Browse Courses',
      description: 'Explore all CIS courses',
      path: '/course-planner',
      color: '#3498db'
    },
    {
      title: '✅ Prerequisite Checker',
      description: 'Check course requirements',
      path: '/prerequisites',
      color: '#2ecc71'
    },
    {
      title: '🎓 AI Recommendations',
      description: 'Get personalized suggestions',
      path: '/recommendations',
      color: '#9b59b6'
    },
    {
      title: '👤 View Profile',
      description: 'Manage your academic profile',
      path: '/profile',
      color: '#e74c3c'
    }
  ];

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto' 
    }}>
      <h2 style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#2c3e50' 
      }}>
        Quick Access
      </h2>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem' 
      }}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            style={{
              display: 'block',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              color: '#2c3e50',
              transition: 'transform 0.3s, box-shadow 0.3s',
              border: `3px solid ${link.color}`
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }}
          >
            <h3 style={{ 
              margin: '0 0 0.5rem 0',
              color: link.color,
              fontSize: '1.2rem' 
            }}>
              {link.title}
            </h3>
            <p style={{ 
              margin: 0,
              color: '#7f8c8d' 
            }}>
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
