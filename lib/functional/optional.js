const defaultData = (_, field) => () => _.values(field);

const optional = (_, field, defaultValue = '') => {
    const getData = typeof (field) === 'string' ? defaultData(_, field) : field;
    return _.coalesce(getData(), _.constant(defaultValue));
};


const path = (p, field) => () => p.values(field);

module.exports = {
    optional,
    path
};
