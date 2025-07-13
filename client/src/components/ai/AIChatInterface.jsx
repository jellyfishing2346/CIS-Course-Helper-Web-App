import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AIChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hi ${user?.name || 'there'}! 👋 I'm your CIS Course Advisor AI. I can help you with course recommendations, academic planning, and answering questions about Brooklyn College's Computer Science program. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What courses should I take next semester?",
    "How do I prepare for CISC 3220 (Algorithms)?",
    "What's the difference between CS and CIS majors?",
    "Can you create a 4-year graduation plan for me?",
    "What programming languages should I learn?",
    "How can I improve my coding skills?"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, user);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question, user) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('next semester') || lowerQuestion.includes('what course')) {
      return `Based on your current progress (${user?.completedCourses?.length || 0} courses completed), I recommend:

📚 **Priority Courses:**
• CISC 3130 - Data Structures (foundation for advanced courses)
• MATH 1206 - Calculus II (required for CS major)

🎯 **Good Options:**
• CISC 2820W - Ethics in Computing (fulfills writing requirement)
• PHIL 3318W - Bioethics (alternative ethics option)

💡 These courses will keep you on track for graduation and provide solid fundamentals for upper-level CS courses.`;
    }
    
    if (lowerQuestion.includes('algorithm') || lowerQuestion.includes('3220')) {
      return `Great question! CISC 3220 (Analysis of Algorithms) is challenging but rewarding. Here's how to prepare:

📋 **Prerequisites Review:**
• Master CISC 3130 (Data Structures) - arrays, linked lists, trees, graphs
• Strong foundation in CISC 2210 (Discrete Math) - proof techniques, big-O notation

🔧 **Preparation Tips:**
• Practice implementing basic algorithms in Java/Python
• Review mathematical concepts: logarithms, summations, recurrence relations
• Strengthen problem-solving skills with LeetCode easy/medium problems

📖 **Recommended Resources:**
• "Introduction to Algorithms" by CLRS
• Practice on HackerRank and CodeSignal`;
    }

    if (lowerQuestion.includes('cs') && lowerQuestion.includes('cis')) {
      return `Great question! Here's the breakdown:

🔬 **Computer Science (CS):**
• More theoretical and math-heavy
• Focus on algorithms, theory, research
• Requires more advanced mathematics (Calculus, Linear Algebra)
• Better for graduate school or research careers

💼 **Computer Information Systems (CIS):**
• More practical and business-oriented
• Focus on software development, databases, systems
• Less mathematics, more hands-on projects
• Great for industry software development roles

🎯 **Brooklyn College Advantage:**
Both programs are excellent and share many core courses. You can always switch between them or even double major!`;
    }

    if (lowerQuestion.includes('4-year') || lowerQuestion.includes('graduation')) {
      return `I'd love to help create your 4-year plan! Based on your current status:

📊 **Your Progress:**
• Completed: ${user?.completedCourses?.length || 0} courses
• Major: ${user?.major || 'Computer Science'}
• Expected Graduation: ${user?.graduationYear || '2026'}

🗓️ **Recommended Path:**
Let me suggest visiting the Course Planner tab where you can drag and drop courses into semesters. I can also help you prioritize:

**Year 1-2:** Core programming (CISC 1115, 3115, 3130)
**Year 3:** Advanced topics (CISC 3220, 3320, electives)
**Year 4:** Capstone project and specialization courses

Would you like me to be more specific about any semester?`;
    }

    return `That's an interesting question! Based on my knowledge of Brooklyn College's CIS program, here are some thoughts:

💡 **General Advice:**
• Focus on building strong programming fundamentals
• Don't rush through courses - understanding is more important than speed
• Get involved in coding clubs and hackathons
• Consider internships to gain real-world experience

🔗 **Helpful Resources:**
• Brooklyn College CIS Department office hours
• Tutoring services in the library
• Study groups with classmates
• Online resources like GitHub and Stack Overflow

Is there anything more specific you'd like to know about course planning or the CIS program?`;
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '600px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#1565c0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px'
        }}>
          🤖
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>CIS Course Advisor AI</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
            Powered by Brooklyn College CIS Knowledge Base
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.map(message => (
          <div key={message.id} style={{
            display: 'flex',
            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '0.75rem 1rem',
              borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              backgroundColor: message.type === 'user' ? '#1976d2' : 'white',
              color: message.type === 'user' ? 'white' : '#333',
              whiteSpace: 'pre-line',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              lineHeight: '1.4'
            }}>
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '18px 18px 18px 4px',
              backgroundColor: 'white',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                gap: '0.25rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#666',
                  animation: 'bounce 1.5s infinite'
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#666',
                  animation: 'bounce 1.5s infinite 0.2s'
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#666',
                  animation: 'bounce 1.5s infinite 0.4s'
                }} />
              </div>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div style={{
          padding: '0 1rem 1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {suggestedQuestions.slice(0, 3).map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(question)}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.borderColor = '#1976d2';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#ddd';
              }}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything about CIS courses, requirements, or planning..."
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '24px',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: inputValue.trim() ? '#1976d2' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '24px',
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default AIChatInterface;
