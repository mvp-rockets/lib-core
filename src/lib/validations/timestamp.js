module.exports = (value) => !isNaN(new Date(value).getTime()) && typeof (new Date(value).getTime()) === typeof (value);
