const { Router } = require('express');
const auth = Router();

const authController = require('../controllers/authController');
const authValidator = require('../validations/authValidator');

// GET register form
auth.get('/register', (req, res) => {
  return res.send('GET HTTP method on register resource');
});

auth.post(
  '/register',
  authValidator.validateNewUser,
  authController.createNewUser
);

// GET login form
// auth.get('/login');

// POST login form
// auth.post('/login');

// POST logout
// auth.post('/logout');

module.exports = auth;
