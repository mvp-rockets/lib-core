let Maybe = require('folktale/maybe');
const R = require('ramda');
// whenMaybe::(fn::a->a)->(fn::a->a)->Maybe->a
const whenMaybe = R.curry((successFunction, failureFunction, maybe) => {
    return maybe.matchWith({
        Just: ({
            value
        }) => {
            return successFunction(value);
        },
        Nothing: ({
            value
        }) => {
            if (failureFunction) {
                return failureFunction(value);
            } else {
                return Maybe.Nothing();
            }
        }
    });
});

module.exports = whenMaybe;
