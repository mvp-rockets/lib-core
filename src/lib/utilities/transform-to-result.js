const R = require('ramda');
const Result = require('folktale/result');

const transformToResult = R.curry(async (fn, data) => Result.Ok(await fn(data)));

module.exports = transformToResult;
