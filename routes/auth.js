const { Router } = require('express');
const auth = Router();

const authController = require('../controllers/authController');
const authValidator = require('../middlewares/validations/authValidator');

auth.get('/register', (req, res) => {
  return res.send('GET HTTP method on register resource');
});

auth.post(
  '/register',
  authValidator.validateNewUser,
  authController.createNewUser
);

auth.get('/login', (req, res) => {
  return res.send('GET HTTP method on login resource');
});

auth.post('/login', authValidator.validateLogInItems, authController.login);

module.exports = auth;
