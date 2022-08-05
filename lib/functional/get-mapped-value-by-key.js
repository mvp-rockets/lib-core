const {
    prop, fromPairs, filter, compose, equals, type, curry
} = require('ramda');

const getMappedValue = key => compose(
    prop(key),
    fromPairs,
    filter(
        compose(equals('Array'), type)
    )
);


const getMappedValueByKey = curry((key, result) => getMappedValue(key)(result));

module.exports = getMappedValueByKey;
