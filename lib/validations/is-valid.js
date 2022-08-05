const isValid = result => result[1].matchWith({
    Ok: () => true,
    Error: () => false
});

module.exports = isValid;
