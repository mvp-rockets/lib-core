const codes = {
	400: 'Bad Request',
	401: 'Unauthorized',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	406: 'Not Acceptable',
	409: 'Conflict',
	500: 'Internal Server Error',
	501: 'Not Implemented',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout'
};

module.exports = class ApiError {
	constructor(error, errorMessage, code = 500) {
		this.code = code;
		this.error = error;
		this.errorMessage = errorMessage;
		this.errorDescription = codes[code];
	}
};
