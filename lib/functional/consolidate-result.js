const R = require('ramda');
const Maybe = require('folktale/maybe');
const Result = require('folktale/result');
const whenMaybe = require('./whenMaybe');


const consolidate = listOfResult => Maybe.Just(R.reduce(
    (acc, data) => whenMaybe(
        value => R.assoc(data[0], value, acc),
        () => acc
    )(data[1]),
    {},
    listOfResult
));

const consolidateResult = async function (result) {
    return Result.Ok(consolidate(result));
};

module.exports = consolidateResult;
