const R = require('ramda');
const Maybe = require('folktale/maybe');
const whenMaybe = require('./whenMaybe');

const transformNothing = R.curry((valueForNothing, maybe) => whenMaybe(
    Maybe.Just,
    () => Maybe.Just(valueForNothing)
)(maybe));

module.exports = transformNothing;
