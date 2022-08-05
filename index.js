const notEmpty = require('./lib/validations/not-empty');
const composeResult = require('./lib/functional/compose-result');
const conditional = require('./lib/functional/conditional');
const consolidateResult = require('./lib/functional/consolidate-result');
const doNothing = require('./lib/functional/doNothing');
const filterMappedValues = require('./lib/functional/filter-mapped-values');
const getMappedValueByKey = require('./lib/functional/get-mapped-value-by-key');
const ifElse = require('./lib/functional/ifElse');
const mapResult = require('./lib/functional/map-result');
const onSuccess = require('./lib/functional/on-success');
const returnNothing = require('./lib/functional/return-nothing');
const returnEmptyResult = require('./lib/functional/returnEmptyResult');
const respond = require('./lib/functional/respond');
const toMaybe = require('./lib/functional/to-maybe');
const transformNothing = require('./lib/functional/transform-nothing');
const transformToResult = require('./lib/functional/transform-to-result');
const transformResult = require('./lib/functional/transformResult');
const whenMaybe = require('./lib/functional/whenMaybe');
const whenResult = require('./lib/functional/whenResult');
const withArgs = require('./lib/functional/with-args');
const args = require('./lib/functional/args');
const unmap = require('./lib/functional/unmap');
const optional = require('./lib/functional/optional');
const optionalProject = require('./lib/functional/optional-project');
const logger = require('./lib/functional/logger');
const standardizeMobile = require('./lib/standardize-mobile');

module.exports = {
    logInfo: logger.logInfo,
    logError: logger.logError,
    logDebug: logger.logDebug,
    unmap,
    optional: optional.optional,
    path: optional.path,
    optionalProject,
    composeResult,
    conditional,
    consolidateResult,
    doNothing,
    filterMappedValues,
    getMappedValueByKey,
    ifElse,
    mapResult,
    onSuccess,
    respond,
    returnNothing,
    returnEmptyResult,
    toMaybe,
    transformNothing,
    transformToResult,
    transformResult,
    whenMaybe,
    whenResult,
    withArgs,
    args,
    notEmpty,
    standardizeMobile
};
