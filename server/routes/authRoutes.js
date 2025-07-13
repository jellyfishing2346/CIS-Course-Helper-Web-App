import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('📝 Signup request:', req.body);
    
    const { firstName, lastName, email, password, major, expectedGraduation, careerInterest } = req.body;
    
    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'All fields required' });
    }

    // Check existing user
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('🔒 Creating user...');
    
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      major: major || 'CIS',
      expectedGraduation: expectedGraduation || '',
      careerInterest: careerInterest || ''
    });

    console.log('✅ User created:', user._id);

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        major: user.major,
        expectedGraduation: user.expectedGraduation,
        careerInterest: user.careerInterest
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    console.error('❌ Error message:', error.message);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message // For debugging
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('🔑 Login request:', { email: req.body.email });
    
    const { email, password } = req.body;
    
    // Find user and check password
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        major: user.major,
        expectedGraduation: user.expectedGraduation,
        careerInterest: user.careerInterest
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
