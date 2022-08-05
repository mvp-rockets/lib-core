const Result = require('folktale/result');

function whenResult(successFunction, failureFunction) {
	return async function (result) {
		return result.matchWith({
			Ok: async ({
				value
			}) => successFunction(value),
			Error: async ({
				value
			}) => {
				if (failureFunction) {
					return failureFunction(value);
				}
				return Result.Error(value);
			}
		});
	};
}

module.exports = whenResult;
