const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const ApiError = require('src/lib/utilities/api-error');
const HTTP_CONSTANT = require('src/lib/utilities/http-constant');

describe('utilities: api error', () => {
	const sandbox = sinon.createSandbox();

	it('should return api error instance with given status code, error message, error', async () => {
		const error = {
			stack: 'not implemented'
		};
		const errorMessage = 'Method not implemented';
		const result = new ApiError(error, errorMessage, HTTP_CONSTANT.NOT_IMPLEMENTED);
		expect(result).to.be.instanceOf(ApiError);
		expect(result).to.be.eql({
			code: HTTP_CONSTANT.NOT_IMPLEMENTED,
			error,
			errorMessage,
			errorDescription: 'Not Implemented'
		});
	});

	it('should return default 500 status code', async () => {
		const error = {
			stack: 'some error'
		};
		const errorMessage = 'failed to do the operation';
		const result = new ApiError(error, errorMessage);
		expect(result).to.be.instanceOf(ApiError);
		expect(result).to.be.eql({
			code: HTTP_CONSTANT.INTERNAL_SERVER_ERROR,
			error,
			errorMessage,
			errorDescription: 'Internal Server Error'
		});
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
