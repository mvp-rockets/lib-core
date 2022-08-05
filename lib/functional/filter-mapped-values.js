const R = require('ramda');

const filterMappedValues = R.filter(R.compose(R.equals('Array'), R.type));
module.exports = filterMappedValues;
