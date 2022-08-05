const Result = require('folktale/result');
const whenResult = require('./whenResult');

const mapResult = (key, fn) => async () => {
    const currentResult = await fn();
    return whenResult(
        currentResultValue => Result.Ok([key, currentResultValue])
    )(currentResult);
};
module.exports = mapResult;
