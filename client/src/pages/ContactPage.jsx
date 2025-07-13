import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          📞 Contact Us
        </h1>
        <p style={{ margin: 0, fontSize: '1.3rem', opacity: 0.9 }}>
          We're here to help you succeed in your academic journey
        </p>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Contact Form */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
              💬 Send us a Message
            </h2>
            
            {submitted && (
              <div style={{
                backgroundColor: '#d5f4e6',
                color: '#27ae60',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                border: '1px solid #a8e6cf'
              }}>
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  Brooklyn College Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.name@brooklyn.cuny.edu"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a topic...</option>
                  <option value="course-planning">Course Planning Help</option>
                  <option value="prerequisite-question">Prerequisite Question</option>
                  <option value="technical-issue">Technical Issue</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#2c3e50'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="How can we help you?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1565c0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1976d2'}
              >
                📧 Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div>
            {/* Contact Information */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
                📍 Get in Touch
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    🏛️
                  </div>
                  <div>
                    <strong>Brooklyn College CIS Department</strong>
                    <br />
                    <span style={{ color: '#666' }}>
                      2900 Bedford Avenue, Brooklyn, NY 11210
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f5e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    📧
                  </div>
                  <div>
                    <strong>Email Support</strong>
                    <br />
                    <span style={{ color: '#666' }}>
                      help@ciscoursehelper.brooklyn.edu
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#fff3e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    ⏰
                  </div>
                  <div>
                    <strong>Response Time</strong>
                    <br />
                    <span style={{ color: '#666' }}>
                      Usually within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
                🚀 Quick Help
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                  📚 Course Planning Questions?
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Try our AI Chat Assistant for instant help with course selection and planning.
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                  🔧 Technical Issues?
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Check if refreshing the page helps, or try clearing your browser cache.
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                  💡 Feature Ideas?
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  We love hearing from students! Share your ideas to make the app better.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
            🕐 Virtual Office Hours
          </h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Join our weekly virtual office hours for live help with course planning
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <strong>📅 Mondays</strong>
              <br />
              2:00 PM - 4:00 PM
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <strong>📅 Wednesdays</strong>
              <br />
              10:00 AM - 12:00 PM
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <strong>📅 Fridays</strong>
              <br />
              1:00 PM - 3:00 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
