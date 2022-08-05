const R = require('ramda');

module.exports = R.curry((comparisionLength, value) => R.equals(comparisionLength, R.length(value)));
