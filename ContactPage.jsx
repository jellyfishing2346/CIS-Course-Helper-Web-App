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
      {/* Enhanced Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          fontSize: '8rem',
          opacity: 0.1,
          animation: 'float 3s ease-in-out infinite'
        }}>
          📞
        </div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          fontSize: '6rem',
          opacity: 0.1,
          animation: 'float 3s ease-in-out infinite 1.5s'
        }}>
          💬
        </div>
        
        <h1 style={{ 
          margin: 0, 
          fontSize: '3.5rem', 
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          📞 Get in Touch
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: '1.3rem', 
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          We're here to help you succeed in your academic journey. Reach out anytime!
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
          {/* Enhanced Contact Form */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                margin: '0 auto 1rem'
              }}>
                💬
              </div>
              <h2 style={{ color: '#2c3e50', margin: 0 }}>
                Send us a Message
              </h2>
            </div>
            
            {submitted && (
              <div style={{
                backgroundColor: '#d5f4e6',
                color: '#27ae60',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                border: '1px solid #a8e6cf',
                textAlign: 'center',
                animation: 'slideIn 0.5s ease-out'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                <strong>Thank you! Your message has been sent successfully.</strong>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
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
                    padding: '1rem',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
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
                    padding: '1rem',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
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
                    padding: '1rem',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                >
                  <option value="">Select a topic...</option>
                  <option value="course-planning">📚 Course Planning Help</option>
                  <option value="prerequisite-question">✅ Prerequisite Question</option>
                  <option value="technical-issue">🔧 Technical Issue</option>
                  <option value="feature-request">💡 Feature Request</option>
                  <option value="other">❓ Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
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
                  placeholder="How can we help you? Be as specific as possible..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }}
              >
                📧 Send Message
              </button>
            </form>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            {/* Contact Information */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              marginBottom: '2rem',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  📍
                </div>
                <h3 style={{ color: '#2c3e50', margin: 0 }}>
                  Contact Information
                </h3>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px'
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
                    <strong style={{ color: '#2c3e50' }}>Brooklyn College CIS Department</strong>
                    <br />
                    <span style={{ color: '#666' }}>
                      2900 Bedford Avenue<br />
                      Brooklyn, NY 11210
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px'
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
                    <strong style={{ color: '#2c3e50' }}>Email Support</strong>
                    <br />
                    <span style={{ color: '#666' }}>
                      help@ciscoursehelper.brooklyn.edu
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px'
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
                    <strong style={{ color: '#2c3e50' }}>Response Time</strong>
                    <br />
                    <span style={{ color: '#666' }}>
                      Usually within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Help */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem'
                }}>
                  🚀
              </div>
                <h3 style={{ color: '#2c3e50', margin: 0 }}>
                  Quick Help
                </h3>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                    📚 Course Planning Questions?
                  </h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    Try our AI Chat Assistant for instant help with course selection and planning.
                  </p>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#27ae60' }}>
                    🔧 Technical Issues?
                  </h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    Check if refreshing the page helps, or try clearing your browser cache.
                  </p>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: '#fdf2f2',
                  borderRadius: '10px'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#e74c3c' }}>
                    💡 Feature Ideas?
                  </h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    We love hearing from students! Share your ideas to make the app better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Office Hours */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '3rem',
          marginTop: '3rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            fontSize: '10rem',
            opacity: 0.1
          }}>
            🕐
          </div>
          
          <h3 style={{ 
            fontSize: '2.5rem',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            🕐 Virtual Office Hours
          </h3>
          <p style={{ 
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Join our weekly virtual office hours for live help with course planning
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>��</div>
              <strong>Mondays</strong>
              <br />
              2:00 PM - 4:00 PM
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <strong>Wednesdays</strong>
              <br />
              10:00 AM - 12:00 PM
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <strong>Fridays</strong>
              <br />
              1:00 PM - 3:00 PM
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
