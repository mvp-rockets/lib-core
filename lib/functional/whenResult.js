const Result = require('folktale/result');

// whenResult:: (fn::->a->Promise<Result>)->(fn::->a->Promise<Result>)->(fn::Result->Promise<Result>)
function whenResult(successFunction, failureFunction) {
    return async function (result) {
        return result.matchWith({
            Ok: async ({
                value
            }) => {
                const response = await successFunction(value);
                return response;
            },
            Error: async ({
                value
            }) => {
                if (failureFunction) {
                    return failureFunction(value);
                } else {
                    return Result.Error(value);
                }
            }
        });
    };
}

module.exports = whenResult;
