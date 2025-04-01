// src/pages/AnnouncementsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import announcementsData from '../../../server/data/announcements';
import './announcements.css';

const AnnouncementsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="announcements-container">
      <div className="announcements-content">
        <button
          onClick={() => navigate(-1)}
          className="announcements-back-btn"
        >
          <svg
            className="announcements-back-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to Dashboard
        </button>

        <header className="announcements-header">
          <h1 className="announcements-title"><a href="/announcements">University Announcements</a></h1>
          <div className="announcements-divider"></div>
          <p className="announcements-subtitle">
            Official communications from the university administration
          </p>
        </header>
        
        <div className="announcements-list">
          {announcementsData.map((announcement) => (
            <article 
              key={announcement.id}
              className="announcement-card"
            >
              <div className="announcement-content">
                <div className={`announcement-icon-container ${
                  announcement.isImportant 
                    ? 'announcement-important' 
                    : 'announcement-normal'
                }`}>
                  <span className="announcement-icon">{announcement.icon}</span>
                </div>
                <div className="announcement-text-content">
                  <div className="announcement-header">
                    <h2 className="announcement-title">{announcement.title}</h2>
                    <p className="announcement-date">{announcement.date}</p>
                  </div>
                  <p className="announcement-body">{announcement.content}</p>
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