const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const ApiError = require('src/lib/utilities/api-error');

describe('utilities: api error', () => {
	const sandbox = sinon.createSandbox();

	it('should return api error instance with given status code, error message, error', async () => {
		const statusCode = 501;
		const error = {
			stack: 'not implemented'
		};
		const errorMessage = 'Method not implemented';
		const result = new ApiError(error, errorMessage, statusCode);
		expect(result).to.be.instanceOf(ApiError);
		expect(result).to.be.eql({
			code: statusCode,
			error,
			errorMessage
		});
	});

	it('should return default 500 status code', async () => {
		const error = {
			stack: 'not implemented'
		};
		const errorMessage = 'Method not implemented';
		const result = new ApiError(error, errorMessage);
		expect(result).to.be.instanceOf(ApiError);
		expect(result).to.be.eql({
			code: 500,
			error,
			errorMessage
		});
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
