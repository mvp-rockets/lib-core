const R = require('ramda');
const Maybe = require('folktale/maybe');
const Result = require('folktale/result');
const logger = require('src/lib/logger');
const fromMayBe = (maybe) => {
	let value;
	if (Maybe.hasInstance(maybe)) value = maybe.getOrElse({});
	else value = maybe;
	return value;
};

const logError = R.curry((message, value) => {
	const error = fromMayBe(value);
	logger.logger.log('error', message, { body: { error } });
	return Result.Ok('Successfully logged error message');
});

const logInfo = R.curry((message, value) => {
	logger.logger.log('info', message, { body: { data: fromMayBe(value) } });
	return Result.Ok('Successfully logged info message');
});

const logDebug = R.curry((message, value) => {
	logger.logger.log('debug', message, { body: { data: fromMayBe(value) } });
	return Result.Ok('Successfully logged debug message');
});

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logDebug = logDebug;
