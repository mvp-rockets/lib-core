const R = require('ramda');
const whenResult = require('./whenResult');
const ifElse = require('./ifElse').ifElse;
const Result = require('folktale/result');

const composeResult = function () {
    if (arguments.length === 0) {
        throw new Error('onSuccess requires at least one argument');
    }
    const init = Array.prototype.slice.call(arguments);
    const last = init.pop();
    return ifElse(R.isEmpty,
        () => R.composeP(last),
        () => R.composeP(R.composeP.apply(this, R.map(executeIfResultIsSuccessful, init)), last))(init);
};

const executeIfResultIsSuccessful = R.curry(async (fn, result) => {
    if (Result.hasInstance(result)) {
        return await whenResult(value => fn(value))(result);
    }
    return Result.Error('Return type of execution was not type of folktale/result.');
});


module.exports = composeResult;
