require('app-module-path').addPath(__dirname);

// * Utilities
const composeResult = require('./src/lib/utilities/compose-result');
const ifElse = require('./src/lib/utilities/ifElse');
const respond = require('./src/lib/utilities/respond');
const transformToResult = require('./src/lib/utilities/transform-to-result');
const whenResult = require('./src/lib/utilities/whenResult');
const withArgs = require('./src/lib/utilities/with-args');
const doNothing = require('./src/lib/utilities/doNothing');
const args = require('./src/lib/utilities/args');
const utilityLogger = require('./src/lib/utilities/logger');
const uuid = require('./src/lib/utilities/uuid');
const ApiError = require('./src/lib/utilities/api-error');

module.exports = {
	logInfo: utilityLogger.logInfo,
	logError: utilityLogger.logError,
	logDebug: utilityLogger.logDebug,
	composeResult,
	ifElse,
	respond,
	transformToResult,
	whenResult,
	withArgs,
	doNothing,
	uuid,
	args,
	ApiError
};
