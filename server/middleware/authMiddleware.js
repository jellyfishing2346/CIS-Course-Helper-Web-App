import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Optional: Verify user still exists
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid - user not found' });
    }

    req.user = decoded;
    req.userDocument = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;