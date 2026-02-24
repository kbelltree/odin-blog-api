const { body } = require('express-validator');
const validationErrorHandler = require('./validationErrorHandler');

const validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required.'),

  body('content').trim().notEmpty().withMessage('Content can not be empty.'),

  validationErrorHandler.handleErrors,
];

module.exports = { validatePost };
