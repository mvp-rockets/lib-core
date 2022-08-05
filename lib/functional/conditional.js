const R = require('ramda');
const Result = require('folktale/result');
const Maybe = require('folktale/maybe');

const conditional = (check, fn) => async () => R.when(check, async () => fn())(Result.Ok(Maybe.Just('Skiped this step')));
module.exports = conditional;
