import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DegreeProgress = () => {
  const degreeRequirements = {
    'Core Requirements': {
      completed: 6,
      total: 8,
      courses: ['CISC 1115', 'CISC 2210', 'CISC 3115', 'CISC 3130', 'CISC 3140', 'CISC 3142'],
      remaining: ['CISC 3320', 'CISC 4900']
    },
    'Mathematics': {
      completed: 2,
      total: 3,
      courses: ['MATH 1201', 'MATH 1206'],
      remaining: ['MATH 2501']
    },
    'CIS Electives': {
      completed: 1,
      total: 3,
      courses: ['CISC 3410'],
      remaining: ['Choose 2 more from CISC 3000+ level']
    },
    'Ethics': {
      completed: 0,
      total: 1,
      courses: [],
      remaining: ['CISC 2820W or PHIL 3318W']
    }
  };

  const totalCompleted = Object.values(degreeRequirements).reduce((sum, req) => sum + req.completed, 0);
  const totalRequired = Object.values(degreeRequirements).reduce((sum, req) => sum + req.total, 0);
  const overallProgress = Math.round((totalCompleted / totalRequired) * 100);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>🎓 Degree Progress - Computer Science Major</h2>
      
      {/* Overall Progress */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px'
      }}>
        <div style={{ width: '120px', height: '120px' }}>
          <CircularProgressbar
            value={overallProgress}
            text={`${overallProgress}%`}
            styles={buildStyles({
              textColor: '#2c3e50',
              pathColor: '#3498db',
              trailColor: '#ecf0f1'
            })}
          />
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>Overall Progress</h3>
          <p style={{ fontSize: '1.1rem', color: '#7f8c8d', margin: '0.5rem 0' }}>
            {totalCompleted} of {totalRequired} requirements completed
          </p>
          <p style={{ margin: 0, color: '#27ae60', fontWeight: 'bold' }}>
            🎯 On track for graduation Spring 2026!
          </p>
        </div>
      </div>

      {/* Detailed Requirements */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {Object.entries(degreeRequirements).map(([category, req]) => {
          const progress = Math.round((req.completed / req.total) * 100);
          return (
            <div key={category} style={{
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0 }}>{category}</h4>
                <span style={{ 
                  fontSize: '0.9rem',
                  color: progress === 100 ? '#27ae60' : '#3498db',
                  fontWeight: 'bold'
                }}>
                  {req.completed}/{req.total}
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#ecf0f1',
                borderRadius: '4px',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: progress === 100 ? '#27ae60' : '#3498db',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Completed Courses */}
              {req.courses.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#27ae60', fontSize: '0.9rem' }}>✅ Completed:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    {req.courses.map(course => (
                      <span key={course} style={{
                        display: 'inline-block',
                        backgroundColor: '#d5f4e6',
                        color: '#27ae60',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        margin: '0.25rem 0.25rem 0.25rem 0'
                      }}>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining Requirements */}
              {req.remaining.length > 0 && (
                <div>
                  <strong style={{ color: '#e74c3c', fontSize: '0.9rem' }}>📋 Still Need:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    {req.remaining.map((item, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        backgroundColor: '#fdf2f2',
                        color: '#e74c3c',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        margin: '0.25rem 0.25rem 0.25rem 0'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Graduation Timeline */}
      <div style={{ 
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px',
        border: '1px solid #27ae60'
      }}>
        <h3 style={{ color: '#27ae60', margin: '0 0 1rem 0' }}>🎓 Graduation Timeline</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Current Semester:</strong> Spring 2025<br />
            <small>6 courses remaining</small>
          </div>
          <div>
            <strong>Expected Graduation:</strong> Spring 2026<br />
            <small>On track! 🎯</small>
          </div>
          <div>
            <strong>Cumulative GPA:</strong> 3.7<br />
            <small>Magna Cum Laude track</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DegreeProgress;