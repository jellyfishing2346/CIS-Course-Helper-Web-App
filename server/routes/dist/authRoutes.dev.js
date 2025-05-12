"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// NEW: Import jsonwebtoken
// Assuming your User model is correctly imported
var router = _express["default"].Router(); // Input validation function (keep as is)


var validateInput = function validateInput(username, email, password) {
  if (!username || username.length < 3) return 'Username must be at least 3 characters long';
  if (!email || !/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
  if (!password || password.length < 6) return 'Password must be at least 6 characters long';
  return null;
}; // Sign-up route


router.post('/signup', function _callee(req, res) {
  var _req$body, username, email, password, validationError, existingUser, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          console.log("📥 Signup route hit", {
            username: username,
            email: email
          });
          validationError = validateInput(username, email, password);

          if (!validationError) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: validationError
          }));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            $or: [{
              username: username
            }, {
              email: email
            }]
          }));

        case 8:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 12;
            break;
          }

          console.log("🚨 User already exists in DB:", existingUser.username);
          return _context.abrupt("return", res.status(400).json({
            message: 'Username or email already exists'
          }));

        case 12:
          // 🌟 DEBUG LOGS FOR SIGNUP 🌟
          console.log("DEBUG SIGNUP: Plaintext password received (for hashing):", password); // IMPORTANT: Password hashing is now handled ONLY by the pre('save') hook in User.js
          // We pass the plaintext password, and the hook will hash it.
          // const salt = await bcrypt.genSalt(10);
          // const hashedPassword = await bcrypt.hash(password, salt);
          // console.log("DEBUG SIGNUP: Generated hashed password:", hashedPassword); // This log is now less useful here
          // You can add a log after user.save() if you want to retrieve and log the final hash

          newUser = new _User["default"]({
            username: username,
            email: email,
            password: password
          }); // Pass plaintext password

          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          // The pre('save') hook in User.js will hash it here
          console.log("✅ User successfully saved:", newUser.username);
          res.status(201).json({
            message: 'User created successfully'
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](5);
          console.error("🔥 Error in signup:", _context.t0);
          res.status(500).json({
            message: 'Error creating user',
            error: _context.t0.message
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 20]]);
}); // Login route

router.post('/login', function _callee2(req, res) {
  var _req$body2, username, password, user, isPasswordValid, jwtSecret, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          console.log("📥 Login route hit", {
            username: username
          });

          if (!(!username || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Username and password are required'
          }));

        case 4:
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            username: username
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 11;
            break;
          }

          console.log("❌ User not found");
          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid username or password'
          }));

        case 11:
          // 🌟 DEBUG LOGS FOR LOGIN 🌟
          console.log("DEBUG LOGIN: Plaintext password received (for comparison):", password);
          console.log("DEBUG LOGIN: Hashed password from DB:", user.password);
          _context2.next = 15;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 15:
          isPasswordValid = _context2.sent;
          console.log("✅ Password match result:", isPasswordValid);

          if (isPasswordValid) {
            _context2.next = 20;
            break;
          }

          console.log("🚨 Incorrect password");
          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid username or password'
          }));

        case 20:
          // 🌟 NEW: Generate JWT token upon successful login 🌟
          // IMPORTANT: Replace 'your_jwt_secret_key' with a strong, random key
          // It's best practice to load this from an environment variable (e.g., process.env.JWT_SECRET)
          // Make sure you have dotenv installed and configured in your server.js/app.js to load .env files
          jwtSecret = process.env.JWT_SECRET || 'your_super_secret_random_string_here_at_least_32_chars';
          token = _jsonwebtoken["default"].sign({
            id: user._id,
            username: user.username
          }, // Payload: information to store in the token
          jwtSecret, {
            expiresIn: '1h'
          } // Token expiration (e.g., 1 hour)
          );
          res.status(200).json({
            message: 'Login successful',
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            },
            token: token // <--- The generated token is now included in the response

          });
          _context2.next = 29;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](4);
          console.error("🔥 Error in login:", _context2.t0);
          res.status(500).json({
            message: 'Error logging in',
            error: _context2.t0.message
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 25]]);
});
var _default = router;
exports["default"] = _default;