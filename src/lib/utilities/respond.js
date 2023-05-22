const R = require('ramda');
const Result = require('folktale/result');
const ApiError = require('./api-error');
const logger = require('./logger');
const whenResult = require('./whenResult');

const sendSuccess = R.curry(async (message, isLogged, result) => {
	if (isLogged) {
		logger.logInfo(message, result);
	} else {
		logger.logInfo(message, {});
	}
	return Result.Ok({
		message,
		status: true,
		entity: result
	});
});

const sendFailure = R.curry(async (errorMessage, error) => {
	if (error.constructor.name === 'ApiError') {
		return Result.Error(error);
	}
	return Result.Error(new ApiError(error, errorMessage));
});

module.exports = async (result, message, errorMessage, isLogged = true) => whenResult(
	sendSuccess(message || 'Action successful', isLogged),
	sendFailure(errorMessage || 'Failure')
)(result);
