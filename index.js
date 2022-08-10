require('app-module-path').addPath(__dirname);

// * utilities
const composeResult = require('src/lib/utilities/compose-result');
const ifElse = require('src/lib/utilities/ifElse');
const respond = require('src/lib/utilities/respond');
const transformToResult = require('src/lib/utilities/transform-to-result');
const whenResult = require('src/lib/utilities/whenResult');
const withArgs = require('src/lib/utilities/with-args');
const args = require('src/lib/utilities/args');
const utilityLogger = require('src/lib/utilities/logger');
const ApiError = require('src/lib/utilities/api-error');
const HTTP_CONSTANT = require('src/lib/utilities/http-constant');

module.exports.utilities = {
	logInfo: utilityLogger.logInfo,
	logError: utilityLogger.logError,
	logDebug: utilityLogger.logDebug,
	composeResult,
	ifElse,
	respond,
	transformToResult,
	whenResult,
	withArgs,
	args,
	ApiError,
	HTTP_CONSTANT
};

// * validations
const isBoolean = require('src/lib/validations/is-boolean');
const bulk = require('src/lib/validations/bulk');
const hasLengthOf = require('src/lib/validations/has-length-of');
const isEmail = require('src/lib/validations/is-email');
const isMobileNumber = require('src/lib/validations/is-mobile-number');
const isStringNumeric = require('src/lib/validations/is-string-numeric');
const isUndefined = require('src/lib/validations/is-undefined');
const maxValue = require('src/lib/validations/max-value');
const minValue = require('src/lib/validations/min-value');
const notEmpty = require('src/lib/validations/not-empty');
const numeric = require('src/lib/validations/numeric');
const shouldBeUuid = require('src/lib/validations/should-be-uuid');
const isTimestamp = require('src/lib/validations/is-timestamp');
const validate = require('src/lib/validations/validate');

module.exports.validations = {
	isBoolean,
	bulk,
	hasLengthOf,
	isEmail,
	isMobileNumber,
	isStringNumeric,
	isUndefined,
	maxValue,
	minValue,
	notEmpty,
	numeric,
	shouldBeUuid,
	isTimestamp,
	validate
};

// * Jwt helper

const token = require('src/lib/token');

module.exports.token = token;

// * logger
const logger = require('src/lib/logger');

module.exports.logger = logger;
