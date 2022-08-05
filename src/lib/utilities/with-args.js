const withArgs = (fn, args) => async () => fn(args);

module.exports = withArgs;
