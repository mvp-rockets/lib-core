const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const respond = require('src/lib/utilities/respond');
const Result = require('folktale/result');
const { verifyResultOk, verifyResultError } = require('helpers/verifiers');
const ApiError = require('src/lib/utilities/api-error');

describe('utilities: respond', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return success object if given input is Result.Ok', async () => {
		const finalResult = await respond(Result.Ok(user), 'success message', 'failure message');
		verifyResultOk((result) => {
			expect(result).to.be.eql({
				message: 'success message',
				status: true,
				entity: user
			});
		})(finalResult);
	});

	it('should return success object with default success message if no message is provided', async () => {
		const finalResult = await respond(Result.Ok(user));
		verifyResultOk((result) => {
			expect(result).to.be.eql({
				message: 'Action successful',
				status: true,
				entity: user
			});
		})(finalResult);
	});

	it('should return api error object if given input is Result.Error', async () => {
		const finalResult = await respond(Result.Error('some error'), 'success message', 'failure message');
		verifyResultError((error) => {
			expect(error).to.be.eql(new ApiError('some error', 'failure message'));
		})(finalResult);
	});

	it('should return api error object with default failure message if given input is Result.Error with no message', async () => {
		const finalResult = await respond(Result.Error('some error'));
		verifyResultError((error) => {
			expect(error).to.be.eql(new ApiError('some error', 'Failure'));
		})(finalResult);
	});

	it('should return api error object if the error is already an api error instance', async () => {
		const finalResult = await respond(Result.Error(new ApiError('some error', 'Failure')));
		verifyResultError((error) => {
			expect(error).to.be.eql(new ApiError('some error', 'Failure'));
		})(finalResult);
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
