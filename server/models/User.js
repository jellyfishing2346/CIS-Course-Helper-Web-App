import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define a schema for the course subdocument
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  semester: { // <--- ADD THIS FIELD
    type: String,
    required: true // It's good practice to make it required if always needed
  }
}, { _id: true }); // Ensures each course subdocument automatically gets an _id


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mfaSecret: { type: String }, // For MFA
  avatarUrl: { type: String, default: '' }, // <--- NEW: Add this field
  courses: [courseSchema] // Example if you plan to store courses like this, or adjust as needed
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User; // Use ES Modules export