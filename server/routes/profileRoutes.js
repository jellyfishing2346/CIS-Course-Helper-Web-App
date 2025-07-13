// server/routes/profileRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

// --- JWT Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log("Authentication: No token provided");
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_random_string_here_at_least_32_chars';
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    console.log("Authentication: Token verified for user:", req.user.username);
    next();
  } catch (err) {
    console.error('Authentication: JWT verification error:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// --- Multer Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/uploads/avatars');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${req.user.id}-${uniqueSuffix}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// --- Profile Picture Upload Route ---
router.post('/upload-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or file type not allowed.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const avatarUrl = `uploads/avatars/${req.file.filename}`;
    user.avatarUrl = avatarUrl;
    await user.save();

    res.status(200).json({ message: 'Profile picture uploaded successfully!', avatarUrl: avatarUrl });
  } catch (error) {
    console.error('🔥 Error saving profile picture:', error);
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
      }
    }
    res.status(500).json({ message: 'Server error uploading picture.', error: error.message });
  }
});


// --- GET user profile route ---
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select('-password');

    if (!userProfile) {
      console.log("Profile fetch: User profile not found for ID:", req.user.id);
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json({
      name: userProfile.username,
      email: userProfile.email,
      avatarUrl: userProfile.avatarUrl || '',
      courses: userProfile.courses || []
    });

  } catch (error) {
    console.error('🔥 Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error fetching profile', error: error.message });
  }
});

// --- Add a new course ---
router.post('/add-course', authenticateToken, async (req, res) => {
  const { name, semester } = req.body;
  const userId = req.user.id;

  if (!name || !semester) {
    return res.status(400).json({ message: 'Course name and semester are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newCourse = { name, semester }; // Ensure 'semester' is included here
    user.courses.push(newCourse);
    await user.save();

    res.status(201).json(newCourse);
  } catch (err) {
    console.error('🔥 Error adding course:', err);
    res.status(500).json({ message: 'Server error adding course', error: err });
  }
});


// --- Edit a course ---
router.put('/edit-course/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, semester } = req.body;
    const userId = req.user.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const courseIndex = user.courses.findIndex(c => c._id.toString() === id);
        if (courseIndex === -1) {
            return res.status(404).json({ message: 'Course not found' });
        }

        user.courses[courseIndex].name = name || user.courses[courseIndex].name;
        user.courses[courseIndex].semester = semester || user.courses[courseIndex].semester;
        await user.save();

        res.json(user.courses[courseIndex]);
    } catch (err) {
        console.error('🔥 Error editing course:', err);
        res.status(500).json({ message: 'Server error editing course', error: err.message });  // Log the whole error
    }
});

// --- Delete a course ---
router.delete('/delete-course/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const courseIndex = user.courses.findIndex(c => c._id.toString() === id);
        if (courseIndex === -1) {
            return res.status(404).json({ message: 'Course not found' });
        }

        user.courses.splice(courseIndex, 1);
        await user.save();

        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('🔥 Error deleting course:', err);
        res.status(500).json({ message: 'Server error deleting course', error: err.message }); // Log the whole error
    }
});


export default router;

