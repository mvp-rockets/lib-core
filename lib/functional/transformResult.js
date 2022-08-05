const Result = require('folktale/result');
const whenResult = require('./whenResult');

module.exports = fn => result => whenResult(
    async data => Result.Ok(await fn(data)),
    () => result
)(result);
