module.exports = (value) => {
	return !isNaN(new Date(value).getTime()) && typeof (new Date(value).getTime()) === typeof (value);
}