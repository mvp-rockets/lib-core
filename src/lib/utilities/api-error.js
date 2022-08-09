module.exports = class ApiError {
	constructor(error, errorMessage, code = 500) {
		this.code = code;
		this.error = error;
		this.errorMessage = errorMessage;
	}
};
