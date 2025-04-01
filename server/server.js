import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import coursesRouter from './routes/courses.js';
import authRouter from './routes/authRoutes.js';
import connectDB from './config/db.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Get the directory name
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
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
connectDB();

// API routes
app.use('/api', coursesRouter);
app.use('/api/auth', authRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    attemptedPath: req.originalUrl,
    availableRoutes: [
      '/api/majors',
      '/api/minors',
      '/api?major=:major',
      '/api?minor=:minor',
      '/api/auth'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`Available endpoints:`);
  console.log(`- GET /api/majors`);
  console.log(`- GET /api/minors`);
  console.log(`- GET /api?major=:major`);
  console.log(`- GET /api?minor=:minor`);
  console.log(`- GET /health`);
});