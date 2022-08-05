module.exports = class ApiError {
	constructor(code, error, errorMessage) {
		this.code = code;
		this.error = error;
		this.errorMessage = errorMessage;
	}
};
