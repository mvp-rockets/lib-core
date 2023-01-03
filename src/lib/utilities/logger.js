const R = require('ramda');
const Result = require('folktale/result');
const logger = require('src/lib/logger');
const cls = require('cls-hooked');

const logError = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().error({
		message,
		body: value,
		traceId: namespace ? namespace.get('traceId') : ''
	});
	return Result.Ok('Successfully logged error message');
});

const logInfo = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().info({
		message,
		body: value,
		traceId: namespace ? namespace.get('traceId') : ''
	});
	return Result.Ok('Successfully logged info message');
});

const logDebug = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().debug({
		message,
		body: value,
		traceId: namespace ? namespace.get('traceId') : ''
	});
	return Result.Ok('Successfully logged debug message');
});

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logDebug = logDebug;
