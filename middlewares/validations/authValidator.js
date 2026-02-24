const { body } = require('express-validator');
const validationErrorHandler = require('./validationErrorHandler');

const validateNewUser = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),

  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .isLength({ min: 1, max: 15 })
    .withMessage('Username must be between 1 to 15 characters.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),

  validationErrorHandler.handleErrors,
];

const validateLogInItems = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),

  body('password').trim().notEmpty().withMessage('Password is required.'),

  validationErrorHandler.handleErrors,
];

module.exports = { validateNewUser, validateLogInItems };
