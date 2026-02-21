const { body, validationResult } = require('express-validator');

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

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // All errors is returned in string instead of array list
      const errorMessage = errors
        .array()
        .map((error) => error.msg)
        .join();
      return res.status(400).json({ error: errorMessage });
    }

    return next();
  },
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

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((error) => error.msg)
        .join();
      return res.status(400).json({ error: errorMessage });
    }

    next();
  },
];

module.exports = { validateNewUser, validateLogInItems };
