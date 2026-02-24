const { param } = require('express-validator');
const validationErrorHandler = require('./validationErrorHandler');

function validateUuidInParam(paramName) {
  return [
    param(paramName).isUUID().withMessage('The id format is invalid.'),

    validationErrorHandler.handleErrors,
  ];
}

module.exports = {
  validateUuidInParam,
};
