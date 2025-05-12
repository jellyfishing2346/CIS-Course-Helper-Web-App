import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // NEW: Import jsonwebtoken
import User from '../models/User.js'; // Assuming your User model is correctly imported

const router = express.Router();

// Input validation function (keep as is)
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

    // 🌟 DEBUG LOGS FOR SIGNUP 🌟
    console.log("DEBUG SIGNUP: Plaintext password received (for hashing):", password);
    // IMPORTANT: Password hashing is now handled ONLY by the pre('save') hook in User.js
    // We pass the plaintext password, and the hook will hash it.
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("DEBUG SIGNUP: Generated hashed password:", hashedPassword); // This log is now less useful here
    // You can add a log after user.save() if you want to retrieve and log the final hash

    const newUser = new User({ username, email, password: password }); // Pass plaintext password
    await newUser.save(); // The pre('save') hook in User.js will hash it here

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

    // 🌟 DEBUG LOGS FOR LOGIN 🌟
    console.log("DEBUG LOGIN: Plaintext password received (for comparison):", password);
    console.log("DEBUG LOGIN: Hashed password from DB:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("✅ Password match result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("🚨 Incorrect password");
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // 🌟 NEW: Generate JWT token upon successful login 🌟
    // IMPORTANT: Replace 'your_jwt_secret_key' with a strong, random key
    // It's best practice to load this from an environment variable (e.g., process.env.JWT_SECRET)
    // Make sure you have dotenv installed and configured in your server.js/app.js to load .env files
    const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_random_string_here_at_least_32_chars';

    const token = jwt.sign(
      { id: user._id, username: user.username }, // Payload: information to store in the token
      jwtSecret,
      { expiresIn: '1h' } // Token expiration (e.g., 1 hour)
    );

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token: token // <--- The generated token is now included in the response
    });

  } catch (error) {
    console.error("🔥 Error in login:", error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

export default router;