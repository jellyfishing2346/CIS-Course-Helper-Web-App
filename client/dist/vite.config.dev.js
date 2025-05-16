"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

var _tailwindcss = _interopRequireDefault(require("tailwindcss"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _postcss = _interopRequireDefault(require("@tailwindcss/postcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _vite.defineConfig)({
  plugins: [(0, _pluginReact["default"])()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // Replace with your backend server URL
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    'process.env': {}
  },
  css: {
    postcss: {
      plugins: [(0, _tailwindcss["default"])({}), (0, _postcss["default"])({}), (0, _autoprefixer["default"])()]
    }
  }
});

exports["default"] = _default;