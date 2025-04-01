import express from 'express';
import { majors, minors } from '../data/courses.js';

const router = express.Router();

// Existing endpoint for single major/minor query
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

// NEW endpoints for all majors/minors
router.get('/majors', (req, res) => {
  res.json(majors);
});

router.get('/minors', (req, res) => {
  res.json(minors);
});

export default router;