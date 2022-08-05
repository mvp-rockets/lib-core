var Maybe = require('folktale/maybe');

function whenNothing(fn) {
	return function(maybe) {
		return maybe.matchWith({
			Just: ({
				value
			}) => {
				return function() {
					return maybe;
				}
			},
			Nothing: ({
				value
			}) => {
				return fn(value);
			}
		});
	}
}

module.exports = whenNothing;