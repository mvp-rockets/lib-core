const R = require('ramda');
const Result = require('folktale/result');
const ApiError = require('../utilities/api-error');
const HTTP_CONSTANT = require('../utilities/http-constant');

const notNil = R.compose(R.not, R.isNil);

const mapValueAndRules = R.curry((data, allRules) => {
	const keys = R.keys(allRules);
	return R.map((key) => {
		const value = data ? data[key] : undefined;
		const rules = allRules[key];
		return R.cond([
			[R.is(Array), (currentRules) => ({
				value,
				rules: currentRules,
				name: key
			})],
			[R.T, mapValueAndRules(value)]
		])(rules);
	}, keys);
});

const generateValidationSet = (data, rules) => R.compose(R.flatten, mapValueAndRules)(data, rules);

const validationError = (errors) => Result.Error(new ApiError(errors, 'Validation Error', HTTP_CONSTANT.BAD_REQUEST));

const formResult = (errors) => R.cond([
	[R.isEmpty, Result.Ok],
	[R.T, validationError]
])(errors);

const runSingleValidation = R.curry((value, actualObject, [test, message]) => (test(value, actualObject) ? null : message));

const returnFirstOccurrenceOfError = (value, object, rules) => R.compose(R.find(notNil), R.map(runSingleValidation(value, object)))(rules);

const runValidations = R.curry(
	(actualObject, dataSet) => R.map((dataRule) => returnFirstOccurrenceOfError(dataRule.value, actualObject, dataRule.rules))(dataSet)
);

module.exports = (rules, data) => {
	const result = data || {};
	return R.compose(
		formResult,
		R.filter(notNil),
		R.flatten,
		runValidations(data),
		generateValidationSet
	)(result, rules);
};
