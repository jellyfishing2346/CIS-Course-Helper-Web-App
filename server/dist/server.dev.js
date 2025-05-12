"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _url = require("url");

var _courses = _interopRequireDefault(require("./routes/courses.js"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));

var _profileRoutes = _interopRequireDefault(require("./routes/profileRoutes.js"));

var _db = _interopRequireDefault(require("./config/db.js"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }