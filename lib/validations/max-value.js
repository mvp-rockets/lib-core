const R = require('ramda');

const maxValue = R.curry((max, value) => value <= max);

module.exports = maxValue;
