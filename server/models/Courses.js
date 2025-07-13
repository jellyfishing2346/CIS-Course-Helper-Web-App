const mongoose = require('mongoose');

// Define schema for a course
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Name of the course
  description: { type: String, required: true },    // Description of the course
  options: [{ type: String }],                      // List of course options
  requirements: [{ type: String }],                 // List of course requirements
  prerequisites: [{ type: String }]                 // List of course prerequisites (other courses)
});

// Create a model from the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
