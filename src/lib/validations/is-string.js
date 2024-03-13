const R = require('ramda');

module.exports = (value) => R.compose(R.equals('String'), R.type)(value);
