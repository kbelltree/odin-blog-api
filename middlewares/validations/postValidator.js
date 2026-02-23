const { body, validationResult } = require('express-validator');

const validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required.'),

  body('content').trim().notEmpty().withMessage('Content can not be empty.'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((error) => error.msg)
        .join();
      return res.status(400).json({ error: errorMessage });
    }

    return next();
  },
];

module.exports = { validatePost };
