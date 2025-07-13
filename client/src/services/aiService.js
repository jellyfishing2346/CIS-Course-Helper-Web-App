// Copy this to: client/src/services/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async getCourseRecommendations(userProfile, completedCourses = [], currentSemester = 'Fall') {
    const prompt = `
    You are an academic advisor for Brooklyn College Computer Information Systems (CIS) program.
    
    Student Profile:
    - Major: ${userProfile.major || 'CIS'}
    - Current Semester: ${currentSemester}
    - Completed Courses: ${completedCourses.join(', ') || 'None'}
    - Career Interest: ${userProfile.careerInterest || 'General Software Development'}
    - Preferred Course Load: ${userProfile.preferredCourseLoad || 'Normal (4-5 courses)'}
    
    Based on the CIS curriculum requirements and the student's progress, recommend:
    1. Next semester course suggestions (3-5 courses)
    2. Priority order based on prerequisites
    3. Brief explanation for each recommendation
    4. Any summer/winter course suggestions
    
    Format the response as a structured JSON with:
    {
      "nextSemesterCourses": [
        {
          "courseCode": "CISC XXXX",
          "courseName": "Course Name",
          "priority": "High/Medium/Low",
          "reason": "explanation",
          "prerequisites": ["list of prereqs"]
        }
      ],
      "summerRecommendations": [...],
      "careerPathAlignment": "explanation"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return { error: 'Could not parse AI response' };
    } catch (error) {
      console.error('AI Service Error:', error);
      return { error: 'Failed to get recommendations' };
    }
  }

  async validateCourseSequence(courseSequence) {
    const prompt = `
    As a CIS academic advisor, validate this course sequence for prerequisite conflicts:
    
    Course Sequence: ${courseSequence.map(course => `${course.semester}: ${course.courses.join(', ')}`).join('\n')}
    
    Check for:
    1. Prerequisite violations
    2. Course availability conflicts
    3. Workload balance issues
    4. Graduation timeline optimization
    
    Return a JSON response with validation results and suggestions.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return this.parseAIResponse(response.text());
    } catch (error) {
      console.error('Course validation error:', error);
      return { error: 'Validation failed' };
    }
  }

  parseAIResponse(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { message: text };
    } catch {
      return { message: text };
    }
  }
}

export default new AIService();