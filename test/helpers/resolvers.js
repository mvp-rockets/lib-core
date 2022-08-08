const Result = require('folktale/result');
const ValidationError = require('src/lib/validations/validation-error');

const resolveOk = (value) => Promise.resolve(Result.Ok(value));

const resolveError = (value) => Promise.resolve(Result.Error(value));

const resolveValidationError = (value) => Promise.resolve(Result.Error(new ValidationError(0, value)));

const resolveDbResult = (value) => resolveOk(value);

module.exports.resolveOk = resolveOk;
module.exports.resolveError = resolveError;
module.exports.resolveDbResult = resolveDbResult;
module.exports.resolveValidationError = resolveValidationError;
