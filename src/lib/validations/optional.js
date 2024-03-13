const R = require('ramda');

module.exports = R.curry((validator, value) => {
    if (value) return validator(value);
    return true;
});
