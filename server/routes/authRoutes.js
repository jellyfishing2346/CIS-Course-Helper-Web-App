import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Input validation function
const validateInput = (username, email, password) => {
  if (!username || username.length < 3) return 'Username must be at least 3 characters long';
  if (!email || !/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
  if (!password || password.length < 6) return 'Password must be at least 6 characters long';
  return null;
};

// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("📥 Signup route hit", { username, email });

  const validationError = validateInput(username, email, password);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log("🚨 User already exists in DB:", existingUser.username);
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ User successfully saved:", newUser.username);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("🔥 Error in signup:", error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("📥 Login route hit", { username });

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("✅ Password match result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("🚨 Incorrect password");
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("🔥 Error in login:", error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

export default router;
