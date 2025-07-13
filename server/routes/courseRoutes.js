import express from 'express';
import { CourseService } from '../services/courseService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all available majors and minors
router.get('/programs', (req, res) => {
  try {
    const programs = {
      majors: ['Computer Science', 'Computer Information Systems', 'Multimedia Computing'],
      minors: ['Computer Science', 'Data Science', 'Multimedia Computing', 'Cognitive Science']
    };
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course requirements for a specific major
router.get('/major/:majorType/requirements', (req, res) => {
  try {
    const { majorType } = req.params;
    const requirements = CourseService.getCourseRequirements(majorType);
    
    if (!requirements) {
      return res.status(404).json({ message: 'Major not found' });
    }

    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get minor requirements
router.get('/minor/:minorType/requirements', (req, res) => {
  try {
    const { minorType } = req.params;
    const requirements = CourseService.getMinorRequirements(minorType);
    
    if (!requirements) {
      return res.status(404).json({ message: 'Minor not found' });
    }

    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all courses for a major
router.get('/major/:majorType/courses', (req, res) => {
  try {
    const { majorType } = req.params;
    const courses = CourseService.getCoursesForMajor(majorType);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific course information
router.get('/course/:courseCode', (req, res) => {
  try {
    const { courseCode } = req.params;
    const course = CourseService.getCourseInfo(courseCode);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ ...course, code: courseCode });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check prerequisites for a course
router.post('/prerequisites/check', authMiddleware, (req, res) => {
  try {
    const { courseCode, completedCourses } = req.body;
    const result = CourseService.checkPrerequisites(courseCode, completedCourses);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get AI recommendations
router.post('/recommendations', authMiddleware, (req, res) => {
  try {
    const { completedCourses, majorType, careerInterest } = req.body;
    const recommendations = CourseService.getRecommendations(
      completedCourses, 
      majorType, 
      careerInterest
    );
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Calculate degree progress
router.post('/progress', authMiddleware, (req, res) => {
  try {
    const { completedCourses, majorType } = req.body;
    const progress = CourseService.calculateProgress(completedCourses, majorType);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all courses with availability
router.get('/catalog', (req, res) => {
  try {
    const catalog = CourseService.getAllCourses();
    const coursesArray = Object.entries(catalog).map(([code, info]) => ({
      code,
      ...info
    }));
    res.json(coursesArray);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
