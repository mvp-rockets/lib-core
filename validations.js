require('app-module-path').addPath(__dirname);

// * Validations
const isBoolean = require('./src/lib/validations/is-boolean');
const hasLengthOf = require('./src/lib/validations/has-length-of');
const isEmail = require('./src/lib/validations/is-email');
const isMobileNumber = require('./src/lib/validations/is-mobile-number');
const isStringNumeric = require('./src/lib/validations/is-string-numeric');
const isUndefined = require('./src/lib/validations/is-undefined');
const maxValue = require('./src/lib/validations/max-value');
const minValue = require('./src/lib/validations/min-value');
const notEmpty = require('./src/lib/validations/not-empty');
const numeric = require('./src/lib/validations/numeric');
const shouldBeUuid = require('./src/lib/validations/should-be-uuid');
const isTimestamp = require('./src/lib/validations/is-timestamp');
const validate = require('./src/lib/validations/validate');

module.exports = {
	isBoolean,
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
