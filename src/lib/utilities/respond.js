const R = require('ramda');
const Result = require('folktale/result');
const ApiError = require('./api-error');
const logger = require('./logger');
const whenResult = require('./whenResult');

const sendSuccess = R.curry(async (message, result) => {
	logger.logInfo(message, result);
	return Result.Ok({
		message,
		status: true,
		entity: result
	});
});

const sendFailure = R.curry(async (errorMessage, error) => {
	if (error.constructor.name === 'ValidationError') {
		return Result.Error(error);
	}
	if (error.constructor.name === 'ApiError') {
		return Result.Error(error);
	}
	return Result.Error(new ApiError(0, error, errorMessage));
});

module.exports = async (result, message, errorMessage) => whenResult(
	sendSuccess(message || 'Action successful'),
	sendFailure(errorMessage || 'Failure')
)(result);
