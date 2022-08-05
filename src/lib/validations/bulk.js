const R = require('ramda');

module.exports = (validator, allData) => R.map((data) => [data, validator(data)], allData);
