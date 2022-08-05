const Maybe = require('folktale/maybe');
const notEmpty = require('../../lib/validations/not-empty');
const R = require('ramda');

const toMaybe = data => R.ifElse(
    data => notEmpty(data),
    data => Maybe.Just(data),
    () => Maybe.Nothing()
)(data);
module.exports = toMaybe;
