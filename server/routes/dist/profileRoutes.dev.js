"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server/routes/profileRoutes.js
// Adjust the path if your models folder is different
var router = _express["default"].Router(); // Middleware to authenticate and authorize users based on JWT


var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = req.headers['authorization']; // Expected format: "Bearer TOKEN"

  var token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log("Authentication: No token provided");
    return res.status(401).json({
      message: 'Authentication token required'
    });
  }

  try {
    // IMPORTANT: Use the same JWT_SECRET as in your login route
    var jwtSecret = process.env.JWT_SECRET || 'your_super_secret_random_string_here_at_least_32_chars'; // Verify the token and decode its payload

    var decoded = _jsonwebtoken["default"].verify(token, jwtSecret);

    req.user = decoded; // Attach the decoded user payload (e.g., { id: userId, username: username }) to the request object

    console.log("Authentication: Token verified for user:", req.user.username);
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error('Authentication: JWT verification error:', err.message);
    return res.status(403).json({
      message: 'Invalid or expired token'
    });
  }
}; // GET user profile
// This route will be accessed as /api/profiles when mounted in app.js


router.get('/', authenticateToken, function _callee(req, res) {
  var userProfile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findById(req.user.id).select('-password'));

        case 3:
          userProfile = _context.sent;

          if (userProfile) {
            _context.next = 7;
            break;
          }

          console.log("Profile fetch: User profile not found for ID:", req.user.id);
          return _context.abrupt("return", res.status(404).json({
            message: 'User profile not found'
          }));

        case 7:
          // Ensure your User model has 'username', 'email', and a 'courses' array (if applicable)
          // Adjust the response structure based on your actual User model's fields
          res.status(200).json({
            name: userProfile.username,
            // Assuming 'username' can be used as 'name' for display
            email: userProfile.email,
            courses: userProfile.courses || [] // Return courses as an array, even if empty

          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('🔥 Error fetching user profile:', _context.t0);
          res.status(500).json({
            message: 'Server error fetching profile'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
var _default = router;
exports["default"] = _default;