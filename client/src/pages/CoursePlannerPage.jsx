import React, { useState } from 'react';
import SemesterPlanner from '../components/SemesterPlanner';
import ScheduleBuilder from '../components/ScheduleBuilder';
import DegreeProgress from '../components/DegreeProgress';
import PrerequisiteFlow from '../components/PrerequisiteFlow';

const CoursePlannerPage = () => {
  const [activeTab, setActiveTab] = useState('planner');

  const tabs = [
    { id: 'planner', label: '📅 4-Year Plan', component: SemesterPlanner },
    { id: 'schedule', label: '🗓️ Schedule Builder', component: ScheduleBuilder },
    { id: 'progress', label: '🎓 Degree Progress', component: DegreeProgress },
    { id: 'flow', label: '🔗 Prerequisites', component: PrerequisiteFlow }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Tab Navigation */}
      <div style={{
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 2rem',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                borderTop: activeTab === tab.id ? '3px solid #3498db' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                color: activeTab === tab.id ? '#3498db' : '#666',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default CoursePlannerPage;
