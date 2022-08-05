const Result = require('folktale/result');
const Maybe = require('folktale/maybe');

const returnNothing = () => Result.Ok(Maybe.Nothing());

module.exports = returnNothing;
