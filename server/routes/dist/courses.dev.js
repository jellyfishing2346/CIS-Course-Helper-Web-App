"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _courses = require("../data/courses.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET a single major or minor


router.get('/', function (req, res) {
  try {
    var _req$query = req.query,
        major = _req$query.major,
        minor = _req$query.minor;

    if (major) {
      if (!_courses.majors[major]) return res.status(404).json({
        error: 'Major not found'
      });
      return res.json(_courses.majors[major]);
    }

    if (minor) {
      if (!_courses.minors[minor]) return res.status(404).json({
        error: 'Minor not found'
      });
      return res.json(_courses.minors[minor]);
    }

    res.status(400).json({
      error: 'Missing major or minor parameter'
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      error: 'Server error'
    });
  }
}); // GET all majors and minors

router.get('/majors', function (req, res) {
  res.json(_courses.majors);
});
router.get('/minors', function (req, res) {
  res.json(_courses.minors);
}); // ✅ POST route to add a course (for development/testing)

router.post('/', function (req, res) {
  try {
    var _req$body = req.body,
        type = _req$body.type,
        name = _req$body.name,
        course = _req$body.course; // type = 'major' or 'minor'

    if (!type || !name || !course) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    if (type === 'major') {
      if (!_courses.majors[name]) _courses.majors[name] = [];

      _courses.majors[name].push(course);

      return res.status(201).json({
        message: 'Course added to major'
      });
    }

    if (type === 'minor') {
      if (!_courses.minors[name]) _courses.minors[name] = [];

      _courses.minors[name].push(course);

      return res.status(201).json({
        message: 'Course added to minor'
      });
    }

    res.status(400).json({
      error: 'Invalid type'
    });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({
      error: 'Server error'
    });
  }
});
var _default = router;
exports["default"] = _default;