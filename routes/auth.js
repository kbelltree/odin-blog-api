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
auth.get('/login', (req, res) => {
  return res.send('GET HTTP method on login resource');
});

// POST login route -> compare hash  -> send token
auth.post('/login', authValidator.validateLogInItems, authController.login);

// POST logout
// auth.post('/logout');

module.exports = auth;
