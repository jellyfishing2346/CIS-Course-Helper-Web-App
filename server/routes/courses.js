import express from 'express';
import { majors, minors } from '../data/courses.js';

const router = express.Router();

// GET a single major or minor
router.get('/', (req, res) => {
  try {
    const { major, minor } = req.query;
    if (major) {
      if (!majors[major]) return res.status(404).json({ error: 'Major not found' });
      return res.json(majors[major]);
    }
    if (minor) {
      if (!minors[minor]) return res.status(404).json({ error: 'Minor not found' });
      return res.json(minors[minor]);
    }
    res.status(400).json({ error: 'Missing major or minor parameter' });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all majors and minors
router.get('/majors', (req, res) => {
  res.json(majors);
});

router.get('/minors', (req, res) => {
  res.json(minors);
});

// ✅ POST route to add a course (for development/testing)
router.post('/', (req, res) => {
  try {
    const { type, name, course } = req.body; // type = 'major' or 'minor'
    if (!type || !name || !course) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (type === 'major') {
      if (!majors[name]) majors[name] = [];
      majors[name].push(course);
      return res.status(201).json({ message: 'Course added to major' });
    }

    if (type === 'minor') {
      if (!minors[name]) minors[name] = [];
      minors[name].push(course);
      return res.status(201).json({ message: 'Course added to minor' });
    }

    res.status(400).json({ error: 'Invalid type' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
