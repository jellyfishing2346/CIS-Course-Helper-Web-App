// src/pages/AnnouncementsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import announcementsData from '../../../server/data/announcements';
import '../components/announcements.css'; // Adjusted import path

const AnnouncementsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="announcements-container">
      <div className="announcements-content">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="announcements-back-btn"
        >
          <svg
            className="announcements-back-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>

        {/* Page title */}
        <header className="announcements-header">
          <h1 className="announcements-title">University Announcements</h1>
          <p className="announcements-subtitle">
            Stay updated with the latest news and events
          </p>
        </header>
        
        {/* Announcements list */}
        <div className="announcements-list">
          {announcementsData.map((announcement) => (
            <article 
              key={announcement.id}
              className={`announcement-card ${announcement.isImportant ? 'important' : ''}`}
            >
              <div className="announcement-content">
                <div className="announcement-icon-container">
                  <span className="announcement-icon">{announcement.icon}</span>
                </div>
                <div className="announcement-text-content">
                  <div className="announcement-header">
                    <h2 className="announcement-title">{announcement.title}</h2>
                    <p className="announcement-date">
                      {announcement.date} • {announcement.category}
                    </p>
                  </div>
                  <p className="announcement-body">
                    {announcement.content}
                  </p>
                  
                  {announcement.link && (
                    <a
                      href={announcement.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="announcement-link"
                    >
                      {announcement.link.text}
                      <svg 
                        className="announcement-link-icon" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;