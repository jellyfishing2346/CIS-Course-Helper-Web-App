"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Define a schema for the course subdocument
var courseSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  semester: {
    // <--- ADD THIS FIELD
    type: String,
    required: true // It's good practice to make it required if always needed

  }
}, {
  _id: true
}); // Ensures each course subdocument automatically gets an _id

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mfaSecret: {
    type: String
  },
  // For MFA
  avatarUrl: {
    type: String,
    "default": ''
  },
  // <--- NEW: Add this field
  courses: [courseSchema] // Example if you plan to store courses like this, or adjust as needed

}); // Hash password before saving

userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified('password')) {
            _context.next = 4;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(this.password, 10));

        case 3:
          this.password = _context.sent;

        case 4:
          next();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User; // Use ES Modules export

exports["default"] = _default;