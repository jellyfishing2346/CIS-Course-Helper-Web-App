import React, { useState } from 'react';

const ScheduleBuilder = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [schedule, setSchedule] = useState({});

  const availableSections = {
    'CISC 3130': [
      { section: '01', days: ['Monday', 'Wednesday'], time: '10:00-11:15', professor: 'Dr. Smith', seats: '15/25' },
      { section: '02', days: ['Tuesday', 'Thursday'], time: '14:00-15:15', professor: 'Dr. Johnson', seats: '8/25' },
      { section: '03', days: ['Monday', 'Wednesday', 'Friday'], time: '09:00-09:50', professor: 'Dr. Brown', seats: '22/25' }
    ],
    'CISC 3220': [
      { section: '01', days: ['Monday', 'Wednesday'], time: '11:30-12:45', professor: 'Dr. Wilson', seats: '12/20' },
      { section: '02', days: ['Tuesday', 'Thursday'], time: '15:30-16:45', professor: 'Dr. Davis', seats: '5/20' }
    ]
  };

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const addCourseToSchedule = (course, section) => {
    const newSchedule = { ...schedule };
    section.days.forEach(day => {
      if (!newSchedule[day]) newSchedule[day] = {};
      newSchedule[day][section.time] = {
        course,
        section: section.section,
        professor: section.professor
      };
    });
    setSchedule(newSchedule);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🗓️ Schedule Builder - Spring 2025</h2>
      
      {/* Course Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Available Sections</h3>
        {Object.entries(availableSections).map(([course, sections]) => (
          <div key={course} style={{ marginBottom: '1rem' }}>
            <h4>{course}</h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {sections.map((section, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ddd',
                  borderRadius: '6px'
                }}>
                  <div>
                    <strong>Section {section.section}</strong> • {section.days.join(', ')} • {section.time}
                    <br />
                    <small>{section.professor} • {section.seats} enrolled</small>
                  </div>
                  <button
                    onClick={() => addCourseToSchedule(course, section)}
                    style={{
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Schedule
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Grid */}
      <div style={{ overflowX: 'auto' }}>
        <h3>Your Schedule</h3>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          border: '1px solid #ddd'
        }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Time</th>
              {days.map(day => (
                <th key={day} style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td style={{ 
                  padding: '0.5rem', 
                  border: '1px solid #ddd',
                  fontWeight: 'bold',
                  backgroundColor: '#f8f9fa'
                }}>
                  {time}
                </td>
                {days.map(day => {
                  const classInfo = schedule[day]?.[`${time}:00-${parseInt(time) + 1}:15`];
                  return (
                    <td key={day} style={{ 
                      padding: '0.5rem', 
                      border: '1px solid #ddd',
                      height: '60px',
                      backgroundColor: classInfo ? '#e3f2fd' : 'white'
                    }}>
                      {classInfo && (
                        <div style={{ fontSize: '0.8rem' }}>
                          <strong>{classInfo.course}</strong>
                          <br />
                          <small>{classInfo.professor}</small>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleBuilder;