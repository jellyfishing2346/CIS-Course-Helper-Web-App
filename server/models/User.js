import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  major: { type: String, default: 'Computer Information Systems' },
  minor: { type: String, default: '' },
  expectedGraduation: { type: String, default: '' },
  careerInterest: { type: String, default: '' },
  completedCourses: [{ 
    courseCode: String,
    semester: String,
    year: Number,
    grade: String
  }],
  plannedCourses: [{
    courseCode: String,
    plannedSemester: String,
    plannedYear: Number
  }],
  academicProgress: {
    totalCredits: { type: Number, default: 0 },
    majorCredits: { type: Number, default: 0 },
    gpa: { type: Number, default: 0.0 }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
