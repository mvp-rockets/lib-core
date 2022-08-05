const R = require('ramda');

module.exports.ifElse = (check, success, failure) => (checkArg, arg) => {
	if (check(checkArg)) {
		if (R.isNil(arg)) { return success(checkArg); }
		return success(arg);
	}
	if (R.isNil(arg)) {
		return failure(checkArg);
	} return failure(arg);
};
