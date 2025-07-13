import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '3rem', marginBottom: '1rem' }}>
          About CIS Course Helper
        </h1>
        <p style={{ margin: 0, fontSize: '1.3rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Empowering Brooklyn College students to navigate their Computer Science journey with confidence
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Mission Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', fontSize: '2.2rem', marginBottom: '1rem' }}>
              🎯 Our Mission
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555', marginBottom: '1.5rem' }}>
              We believe every student deserves clear guidance through their academic journey. 
              CIS Course Helper was created to eliminate confusion around course planning and 
              help Brooklyn College students make informed decisions about their education.
            </p>
            <div style={{
              backgroundColor: '#e3f2fd',
              padding: '1.5rem',
              borderRadius: '8px',
              borderLeft: '4px solid #1976d2'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                🌟 What Makes Us Different
              </h4>
              <p style={{ margin: 0, color: '#0d47a1' }}>
                We're built specifically for Brooklyn College's CIS program, with real course data, 
                actual prerequisites, and AI trained on the specific challenges our students face.
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '12px',
            padding: '2rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ margin: '0 0 1rem 0' }}>Built by Students, for Students</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>
              Created by Brooklyn College CIS students who understand the real challenges 
              of course planning and academic success.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#2c3e50', 
            fontSize: '2.2rem',
            marginBottom: '3rem'
          }}>
            🚀 What We Offer
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: '��',
                title: 'AI-Powered Guidance',
                description: 'Get personalized course recommendations based on your progress, interests, and career goals.',
                image: '��'
              },
              {
                icon: '📅',
                title: 'Interactive Planning',
                description: 'Drag-and-drop course planning with real-time prerequisite checking and conflict detection.',
                image: '📊'
              },
              {
                icon: '✅',
                title: 'Prerequisite Tracking',
                description: 'Never wonder if you\'re eligible for a course again. Our system tracks all requirements.',
                image: '🔍'
              },
              {
                icon: '📈',
                title: 'Progress Visualization',
                description: 'See your degree progress with beautiful charts and clear graduation timelines.',
                image: '📋'
              },
              {
                icon: '🔄',
                title: 'Real-Time Updates',
                description: 'Course information stays current with Brooklyn College\'s official catalog.',
                image: '⚡'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Plan your courses anywhere, anytime with our responsive design.',
                image: '📲'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '4rem'
        }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '2rem' }}>
            📊 Making an Impact
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { number: '500+', label: 'Students Helped', icon: '👥' },
              { number: '50+', label: 'Courses Mapped', icon: '📚' },
              { number: '1000+', label: 'Plans Created', icon: '��' },
              { number: '95%', label: 'Success Rate', icon: '🎯' }
            ].map((stat, index) => (
              <div key={index}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{ color: '#666', fontSize: '1.1rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brooklyn College Section */}
        <div style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
          color: 'white',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏛️</div>
          <h2 style={{ margin: '0 0 1rem 0' }}>Proudly Supporting Brooklyn College</h2>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.9, 
            maxWidth: '700px', 
            margin: '0 auto 2rem' 
          }}>
            Brooklyn College's Computer and Information Science department is renowned for 
            its rigorous curriculum and outstanding faculty. We're honored to help students 
            navigate this world-class program.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>🏆 Excellence in Education</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Ranked among top public universities in NYC
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>🌍 Diverse Community</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Students from 100+ countries and backgrounds
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>💼 Career Success</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>
                95% job placement rate for CIS graduates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
