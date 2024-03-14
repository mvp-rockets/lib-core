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
	const init = Array.prototype.slice.call(arguments);
	const last = init.pop();
	return ifElse(
		R.isEmpty,
		() => R.composeWith(R.andThen)([last]),
		() => {
			const args = R.map(executeIfResultIsSuccessful, init);
			return R.composeWith(R.andThen)([
				...args,
				last
			])
		}
	)(init);
};
module.exports = composeResult;
