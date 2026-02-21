const { Router } = require('express');
const auth = Router();

const authController = require('../controllers/authController');
const authValidator = require('../middlewares/validations/authValidator');

auth.post(
  '/register',
  authValidator.validateNewUser,
  authController.createNewUser
);

auth.post('/login', authValidator.validateLogInItems, authController.login);

module.exports = auth;
