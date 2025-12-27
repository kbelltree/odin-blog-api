const { body, validationResult } = require('express-validator');

const validateNewUser = [
  body('email').trim().notEmpty().isEmail().toLowerCase(),
  body('username').trim().isLength({ min: 1, max: 15 }),
  body('password').trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogInItems = [
  body('email').trim().notEmpty().isEmail().toLowerCase(),
  body('password').trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateNewUser, validateLogInItems };
