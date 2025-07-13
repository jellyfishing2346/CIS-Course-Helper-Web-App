import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PrerequisitesPage = () => {
  const { user, loading } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [prerequisiteResults, setPrerequisiteResults] = useState(null);

  // Mock course data
  const courses = [
    'CISC 1115 - Introduction to Computing Using Java',
    'CISC 2210 - Introduction to Discrete Structures',
    'CISC 3115 - Introduction to Modern Programming Techniques',
    'CISC 3130 - Data Structures',
    'CISC 3140 - Design and Implementation of Large-Scale Web Applications',
    'CISC 3220 - Analysis of Algorithms',
    'CISC 3310 - Principles of Computer Architecture',
    'CISC 3320 - Operating Systems',
    'CISC 3410 - Artificial Intelligence',
    'CISC 3440 - Machine Learning',
    'CISC 3810 - Database Systems'
  ];

  const checkPrerequisites = () => {
    if (!selectedCourse) return;

    // Mock prerequisite checking logic
    const courseCode = selectedCourse.split(' - ')[0];
    const userCourses = user?.completedCourses || [];
    
    const prerequisites = {
      'CISC 1115': [],
      'CISC 2210': ['CISC 1115'],
      'CISC 3115': ['CISC 1115'],
      'CISC 3130': ['CISC 3115'],
      'CISC 3140': ['CISC 3130'],
      'CISC 3220': ['CISC 2210', 'CISC 3130'],
      'CISC 3310': ['CISC 2210'],
      'CISC 3320': ['CISC 3130', 'CISC 3310'],
      'CISC 3410': ['CISC 3130'],
      'CISC 3440': ['CISC 3130'],
      'CISC 3810': ['CISC 3130']
    };

    const required = prerequisites[courseCode] || [];
    const missing = required.filter(req => !userCourses.includes(req));
    
    setPrerequisiteResults({
      course: selectedCourse,
      required,
      completed: required.filter(req => userCourses.includes(req)),
      missing,
      eligible: missing.length === 0
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        fontSize: '1.2rem' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#2c3e50' 
      }}>
        Prerequisites Checker
      </h1>

      {user && (
        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem' 
        }}>
          <h3>Your Completed Courses:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {user.completedCourses.map(course => (
              <span key={course} style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                {course}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          fontWeight: 'bold' 
        }}>
          Select a course to check prerequisites:
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
        >
          <option value="">Choose a course...</option>
          {courses.map(course => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={checkPrerequisites}
        disabled={!selectedCourse}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: selectedCourse ? '#3498db' : '#bdc3c7',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: selectedCourse ? 'pointer' : 'not-allowed',
          marginBottom: '2rem'
        }}
      >
        Check Prerequisites
      </button>

      {prerequisiteResults && (
        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${prerequisiteResults.eligible ? '#2ecc71' : '#e74c3c'}`,
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            color: prerequisiteResults.eligible ? '#2ecc71' : '#e74c3c',
            marginBottom: '1rem' 
          }}>
            {prerequisiteResults.eligible ? '✅ Eligible to Enroll' : '❌ Missing Prerequisites'}
          </h3>
          
          <h4>Course: {prerequisiteResults.course}</h4>
          
          {prerequisiteResults.required.length > 0 ? (
            <>
              <h5 style={{ marginTop: '1rem' }}>Required Prerequisites:</h5>
              <ul>
                {prerequisiteResults.required.map(req => (
                  <li key={req} style={{
                    color: prerequisiteResults.completed.includes(req) ? '#2ecc71' : '#e74c3c'
                  }}>
                    {req} {prerequisiteResults.completed.includes(req) ? '✅' : '❌'}
                  </li>
                ))}
              </ul>
              
              {prerequisiteResults.missing.length > 0 && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#fdf2f2',
                  borderRadius: '6px' 
                }}>
                  <strong style={{ color: '#e74c3c' }}>
                    You need to complete: {prerequisiteResults.missing.join(', ')}
                  </strong>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: '#2ecc71' }}>
              No prerequisites required for this course!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PrerequisitesPage;
