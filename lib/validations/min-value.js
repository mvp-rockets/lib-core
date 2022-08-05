const R = require('ramda');

const minValue = R.curry((min, value) => value >= min);

module.exports = minValue;
