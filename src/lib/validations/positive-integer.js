module.exports = (value) => {
    const pattern = /^\+?(0|[1-9]\d*)$/;
    return pattern.test(value);
};
