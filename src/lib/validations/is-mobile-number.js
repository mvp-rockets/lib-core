module.exports = (value) => {
	const pattern = /^[1-9]\d{9}$/;
	return pattern.test(value);
};
