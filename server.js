import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cis-course-helper')
  .then(() => console.log('✅ Connected to MongoDB:', mongoose.connection.host))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'CIS Course Helper API is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
