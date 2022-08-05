const R = require('ramda');

module.exports = value => R.compose(R.equals('Number'), R.type)(value);
