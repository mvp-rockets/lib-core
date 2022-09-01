const R = require('ramda');
const Maybe = require('folktale/maybe');
const Result = require('folktale/result');
const logger = require('src/lib/logger');
const cls = require('cls-hooked');

const fromMayBe = (maybe) => {
	let value;
	if (Maybe.hasInstance(maybe)) value = maybe.getOrElse({});
	else value = maybe;
	return value;
};

const logError = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	const error = fromMayBe(value);
	logger.getLogger().error(message, { body: error, traceId: namespace.get('traceId') });
	return Result.Ok('Successfully logged error message');
});

const logInfo = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().info(message, { body: fromMayBe(value), traceId: namespace.get('traceId') });
	return Result.Ok('Successfully logged info message');
});

const logDebug = R.curry((message, value) => {
	const namespace = cls.getNamespace(logger.getConfig().clsNameSpace);
	logger.getLogger().debug(message, { body: fromMayBe(value), traceId: namespace.get('traceId') });
	return Result.Ok('Successfully logged debug message');
});

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logDebug = logDebug;
