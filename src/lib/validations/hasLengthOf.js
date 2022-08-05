const R = require('ramda');

module.exports = R.curry((comparisonLength, value) => R.equals(comparisonLength, R.length(value)));
