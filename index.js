require('app-module-path').addPath(__dirname);

// utilities
const composeResult = require('src/lib/utilities/compose-result');
const ifElse = require('src/lib/utilities/ifElse');
const respond = require('src/lib/utilities/respond');
const transformToResult = require('src/lib/utilities/transform-to-result');
const whenResult = require('src/lib/utilities/whenResult');
const withArgs = require('src/lib/utilities/with-args');
const args = require('src/lib/utilities/args');
const utilityLogger = require('src/lib/utilities/logger');

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
	args
};

// validations
const boolean = require('src/lib/validations/boolean');
const bulk = require('src/lib/validations/bulk');
const hasLengthOf = require('src/lib/validations/hasLengthOf');
const isEmail = require('src/lib/validations/is-email');
const isMobileNumber = require('src/lib/validations/is-mobile-number');
const isStringNumeric = require('src/lib/validations/is-string-numeric');
const isUndefined = require('src/lib/validations/is-undefined');
const isValid = require('src/lib/validations/is-valid');
const maxValue = require('src/lib/validations/max-value');
const minValue = require('src/lib/validations/min-value');
const notEmpty = require('src/lib/validations/not-empty');
const numeric = require('src/lib/validations/numeric');
const shouldBeUuid = require('src/lib/validations/should-be-uuid');
const timestamp = require('src/lib/validations/timestamp');
const validate = require('src/lib/validations/validate');
const ValidationError = require('src/lib/validations/validation-error');

module.exports.validations = {
	boolean,
	bulk,
	hasLengthOf,
	isEmail,
	isMobileNumber,
	isStringNumeric,
	isUndefined,
	isValid,
	maxValue,
	minValue,
	notEmpty,
	numeric,
	shouldBeUuid,
	timestamp,
	ValidationError,
	validate
};

// Jwt helper

const token = require('src/lib/token');

module.exports.token = token;

// logger
const logger = require('src/lib/logger');

module.exports.logger = logger;
