const R = require('ramda')
const transformResult = require('./transformResult');
const composeResult = require('./compose-result');
const Result = require('folktale/result');

//onSuccess::[fn::Result]->(Result.Ok(Array)|Resut.error)
const onSuccess = function () {
    if (arguments.length === 0) {
        throw new Error('onSuccess requires at least one argument');
    }
    var init = Array.prototype.slice.call(arguments);
    var last = init.pop();
    return composeResult(composeResult.apply(this, R.map(executeIfResultIsSuccessful, init)), firstFunction(last));
}

const firstFunction = (fn) => {
    return async (arg) => {
        let result = await fn(arg);
        if (Result.hasInstance(result)) {
            return transformResult((value) => [value])(result);
        } else {
            return Result.Error('Return type of exection was not type of folktale/result.');
        }

    }
};

const executeIfResultIsSuccessful = R.curry(async (fn, result) => {
    let currentResult = await fn();
    return transformResult((currentValue) => {
        return R.append(currentValue, result);
    })(currentResult);
})
module.exports = onSuccess;
