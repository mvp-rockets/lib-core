const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const { verifyResultOk, verifyResultError } = require('helpers/verifiers');

const isEmail = require('src/lib/validations/is-email');
const notEmpty = require('src/lib/validations/not-empty');
const shouldBeUuid = require('src/lib/validations/should-be-uuid');
const validate = require('src/lib/validations/validate');
const ApiError = require('src/lib/utilities/api-error');
const HTTP_CONSTANT = require('src/lib/utilities/http-constant');

const rule = {
	id: [[shouldBeUuid, 'userId should be valid']],
	firstName: [[notEmpty, 'firstName should not be empty']],
	lastName: [[notEmpty, 'lastName should not be empty']],
	email: [
		[notEmpty, 'email should not be empty'],
		[isEmail, 'email should be valid']
	]
};

const perform = async (data) => validate(rule, data);

describe('validations: validate', () => {
	const sandbox = sinon.createSandbox();
	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return Result.Ok if all the validation rules passed', async () => {
		const validationResult = await perform({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		});
		verifyResultOk((result) => {
			expect(result).to.be.eql([]);
		})(validationResult);
	});

	it('should return Result.Error if the data is not validate', async () => {
		const validationResult = await perform({
			id: '',
			firstName: '',
			lastName: '',
			email: user.email
		});
		verifyResultError((validationError) => {
			expect(validationError).to.be.instanceOf(ApiError);
			expect(validationError.code).to.be.eql(HTTP_CONSTANT.BAD_REQUEST);
			expect(validationError.errorMessage).to.be.eql([
				'userId should be valid',
				'firstName should not be empty',
				'lastName should not be empty']);
			expect(validationError.error).to.be.eql([
				'userId should be valid',
				'firstName should not be empty',
				'lastName should not be empty']);
		})(validationResult);
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
