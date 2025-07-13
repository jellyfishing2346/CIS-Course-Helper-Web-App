import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AIChatInterface from '../components/ai/AIChatInterface';

const RecommendationsPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          🤖 AI Course Recommendations
        </h1>
        <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
          Get personalized course guidance powered by AI
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: 0,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { id: 'chat', label: '💬 AI Chat Assistant', icon: '🤖' },
            { id: 'recommendations', label: '📋 Course Suggestions', icon: '📚' },
            { id: 'insights', label: '📊 Academic Insights', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 2rem',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#f8f9fa' : 'transparent',
                borderTop: activeTab === tab.id ? '3px solid #1976d2' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                color: activeTab === tab.id ? '#1976d2' : '#666',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {activeTab === 'chat' && <AIChatInterface />}
        
        {activeTab === 'recommendations' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, color: '#2c3e50' }}>
              📚 Personalized Course Recommendations
            </h2>
            
            {user && (
              <div style={{
                backgroundColor: '#e3f2fd',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                borderLeft: '4px solid #1976d2'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#1976d2' }}>
                  Based on Your Progress
                </h3>
                <p style={{ margin: 0, color: '#0d47a1' }}>
                  Completed: {user.completedCourses?.length || 0} courses • 
                  Major: {user.major} • 
                  Target Graduation: {user.graduationYear}
                </p>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  title: 'CISC 3130 - Data Structures',
                  priority: 'High Priority',
                  reason: 'Foundation for advanced CS courses',
                  difficulty: 'Moderate',
                  workload: '8-10 hrs/week',
                  color: '#e74c3c'
                },
                {
                  title: 'MATH 1206 - Calculus II',
                  priority: 'Medium Priority',
                  reason: 'Required for CS degree completion',
                  difficulty: 'Challenging',
                  workload: '10-12 hrs/week',
                  color: '#f39c12'
                },
                {
                  title: 'CISC 2820W - Ethics in Computing',
                  priority: 'Low Priority',
                  reason: 'Fulfills writing intensive requirement',
                  difficulty: 'Easy',
                  workload: '4-6 hrs/week',
                  color: '#27ae60'
                }
              ].map((course, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  border: `2px solid ${course.color}`,
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ margin: 0, color: course.color }}>
                      {course.title}
                    </h4>
                    <span style={{
                      backgroundColor: course.color,
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {course.priority}
                    </span>
                  </div>
                  
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    {course.reason}
                  </p>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    <div>
                      <strong>Difficulty:</strong> {course.difficulty}
                    </div>
                    <div>
                      <strong>Workload:</strong> {course.workload}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, color: '#2c3e50' }}>
              �� Your Academic Insights
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: '#1976d2',
                  marginBottom: '0.5rem'
                }}>
                  📈
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Progress Rate</h3>
                <p style={{ margin: 0, color: '#666' }}>
                  You're 65% through your degree
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: '#27ae60',
                  marginBottom: '0.5rem'
                }}>
                  🎯
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Graduation Track</h3>
                <p style={{ margin: 0, color: '#666' }}>
                  On time for {user?.graduationYear || '2026'}
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: '#f39c12',
                  marginBottom: '0.5rem'
                }}>
                  💡
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Recommendations</h3>
                <p style={{ margin: 0, color: '#666' }}>
                  3 courses suggested this term
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default RecommendationsPage;
