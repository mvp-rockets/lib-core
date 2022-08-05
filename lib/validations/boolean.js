const R = require('ramda');

module.exports = value => R.compose(R.equals('Boolean'), R.type)(value);
