const R = require('ramda');
const Result = require('folktale/result');
const cls = require('cls-hooked');
const logger = require('../logger');

const logError = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().error({
		message,
		body: value,
		traceId: namespace ? namespace.get('traceId') : '',
		label: 'error'
	});
	return Result.Ok('Successfully logged error message');
});

const logInfo = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().info({
		message,
		body: value,
		traceId: namespace ? namespace.get('traceId') : '',
		label: 'info'
	});
	return Result.Ok('Successfully logged info message');
});

const logDebug = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().debug({
		message,
		body: value,
		traceId: namespace ? namespace.get('traceId') : '',
		label: 'debug'
	});
	return Result.Ok('Successfully logged debug message');
});

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logDebug = logDebug;
