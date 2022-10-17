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

/*
! composeP is deprecated & no longer maintain by ramda, Need to be fixed ASAP
TODO: Instead of composeP we need to use composeWith Reference: https://github.com/ramda/ramda/issues/3099
* After removing composeP we need to upgrade ramda to fro 0.26.1 to 0.28.0
FIXME: Instead of composeP we need to use composeWith Reference: https://github.com/ramda/ramda/issues/3099
 */
const composeResult = function () {
	if (arguments.length === 0) {
		throw new Error('onSuccess requires at least one argument');
	}
	const init = Array.prototype.slice.call(arguments);
	const last = init.pop();
	return ifElse(
		R.isEmpty,
		() => R.composeWith(R.andThen)([last]),
		() => R.composeWith(R.andThen)([R.composeWith(R.andThen)([]).apply(this, R.map(executeIfResultIsSuccessful, init)), last])

	)(init);
};
module.exports = composeResult;
