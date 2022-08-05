const R = require('ramda');
const Result = require('folktale/result');
const whenResult = require('./whenResult');
const { ifElse } = require('./ifElse');

const executeIfResultIsSuccessful = R.curry(async (fn, result) => {
	if (Result.hasInstance(result)) {
		return whenResult((value) => fn(value))(result);
	}
	return Result.Error('Return type of execution was not type of folktale/result.');
});

const composeResult = function () {
	if (arguments.length === 0) {
		throw new Error('onSuccess requires at least one argument');
	}
	// eslint-disable-next-line prefer-rest-params
	const init = Array.prototype.slice.call(arguments);
	const last = init.pop();
	return ifElse(
		R.isEmpty,
		() => R.composeWith(last),
		() => R.composeWith(R.composeWith.apply(this, R.map(executeIfResultIsSuccessful, init)), last)
	)(init);
};

module.exports = composeResult;
