const { param, validationResult } = require('express-validator');

function validateUuidInParam(paramName) {
  return [
    param(paramName).isUUID(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return next();
    },
  ];
}

module.exports = {
  validateUuidInParam,
};
