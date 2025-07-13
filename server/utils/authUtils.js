const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy'); // For MFA

// Hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Generate MFA secret
const generateMFASecret = () => {
  return speakeasy.generateSecret({ length: 20 });
};

module.exports = { hashPassword, generateMFASecret };