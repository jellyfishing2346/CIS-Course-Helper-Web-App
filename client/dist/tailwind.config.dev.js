"use strict";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'shadow': 'box-shadow'
      }
    }
  },
  plugins: []
};