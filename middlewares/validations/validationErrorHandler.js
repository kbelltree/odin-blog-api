const { validationResult } = require('express-validator');

function handleErrors(req, res, next) {
  const result = validationResult(req).formatWith((error) => error.msg);

  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array().join('\n') });
  }

  return next();
}

module.exports = {
  handleErrors,
};
