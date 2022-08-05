const when = (check, fn) => {
	return (value, info) => {
		if (check(info)) {
			return fn(value);
		} else {

			return true;
		}
	}
}

module.exports = when;