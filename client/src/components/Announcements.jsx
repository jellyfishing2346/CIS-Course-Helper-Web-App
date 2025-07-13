import React from 'react';

const Announcements = () => {
  const announcements = [
    {
      title: '📅 Spring 2025 Registration',
      message: 'Registration for Spring 2025 begins February 1st. Plan your courses now!',
      type: 'info',
      date: 'Jan 12, 2025'
    },
    {
      title: '🆕 New AI/ML Courses',
      message: 'CISC 3440 (Machine Learning) and CISC 3410 (Artificial Intelligence) now available.',
      type: 'success',
      date: 'Jan 10, 2025'
    },
    {
      title: '⚠️ Prerequisite Updates',
      message: 'Some courses have updated prerequisites. Check before registering.',
      type: 'warning',
      date: 'Jan 8, 2025'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'info': return '#3498db';
      case 'success': return '#2ecc71';
      case 'warning': return '#f39c12';
      default: return '#95a5a6';
    }
  };

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
        Latest Announcements
      </h2>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem' 
      }}>
        {announcements.map((announcement, index) => (
          <div
            key={index}
            style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${getTypeColor(announcement.type)}`
            }}
          >
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.5rem' 
            }}>
              <h3 style={{ 
                margin: 0,
                color: getTypeColor(announcement.type),
                fontSize: '1.1rem' 
              }}>
                {announcement.title}
              </h3>
              <span style={{ 
                fontSize: '0.8rem',
                color: '#95a5a6' 
              }}>
                {announcement.date}
              </span>
            </div>
            <p style={{ 
              margin: 0,
              color: '#2c3e50',
              lineHeight: '1.5' 
            }}>
              {announcement.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
