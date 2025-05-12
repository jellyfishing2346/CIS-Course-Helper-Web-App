import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import coursesRouter from './routes/courses.js';
import authRouter from './routes/authRoutes.js';
import profileRouter from './routes/profileRoutes.js'; // <--- NEW: Import profile router
import connectDB from './config/db.js';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 3000;

// Get the directory name (for serving static files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite default
    'http://127.0.0.1:5173', // Alternative localhost
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // For parsing JSON request bodies

// Serve static files (if you have a 'public' folder for your frontend build/assets)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
connectDB();

// API routes
app.use('/api', coursesRouter); // For routes like /api/majors, /api/minors etc.
app.use('/api/auth', authRouter); // For authentication routes: /api/auth/signup, /api/auth/login
app.use('/api/profiles', profileRouter); // <--- NEW: Mount the profile router at /api/profiles

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Catch-all for undefined routes (IMPORTANT: This must be after all your defined routes)
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    attemptedPath: req.originalUrl,
    // It's good practice to keep this list updated with your main routes for debugging
    availableRoutes: [
      '/api/majors',
      '/api/minors',
      '/api?major=:major',
      '/api?minor=:minor',
      '/api/auth/signup', // More specific auth routes
      '/api/auth/login',   // More specific auth routes
      '/api/profiles',     // <--- Add your new profile route here
      '/health'
    ]
  });
});

// Error handling middleware (IMPORTANT: This must be the last middleware)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`Available endpoints:`);
  // Update this list for better clarity in your console
  console.log(`- POST /api/auth/signup`);
  console.log(`- POST /api/auth/login`);
  console.log(`- GET /api/profiles (Protected)`);
  console.log(`- GET /api/majors (via coursesRouter)`);
  console.log(`- GET /api/minors (via coursesRouter)`);
  console.log(`- GET /api?major=:major (via coursesRouter)`);
  console.log(`- GET /api?minor=:minor (via coursesRouter)`);
  console.log(`- GET /health`);
});