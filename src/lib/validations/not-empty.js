const R = require('ramda');

module.exports = (value) => !R.anyPass([R.isEmpty, R.isNil])(value);
