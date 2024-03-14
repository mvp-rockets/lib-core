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
const maxValue = require('src/lib/validations/max-value');
const optional = require('src/lib/validations/optional');
const validate = require('src/lib/validations/validate');
const ApiError = require('src/lib/utilities/api-error');
const HTTP_CONSTANT = require('src/lib/utilities/http-constant');

const adultRule = {
	id: [[shouldBeUuid, 'userId should be valid']],
	firstName: [[notEmpty, 'firstName should not be empty']],
	lastName: [[notEmpty, 'lastName should not be empty']],
	email: [
		[optional(isEmail), 'email should be valid']
	],
	age: [
		[optional(maxValue(100)), "age should be less then 100"],
	]
};

const minorRule = {
	id: [[shouldBeUuid, 'userId should be valid']],
	firstName: [[notEmpty, 'firstName should not be empty']],
	lastName: [[notEmpty, 'lastName should not be empty']],
	email: [
		[optional(isEmail), 'email should be valid']
	],
	age: [
		[optional(maxValue(18)), "age should be less then 18"],
	]
}

describe('validations: optional', () => {
	const sandbox = sinon.createSandbox();
	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});
	
	it('should return true if the given input is null', async () => {
		const result = optional(maxValue, null);
		expect(result).to.be.true;
	});

	it('should return true if the given input is less then 100', async () => {
		const result = optional(maxValue(100), 100);
		expect(result).to.be.true;
	});

	it('should return true if the given input is a valid email', async () => {
		const result = optional(isEmail, "test@example.com");
		expect(result).to.be.true;
	});

	it('should return false if the given input is greater then 100', async () => {
		const result = optional(maxValue(100), 200);
		expect(result).to.be.false;
	});

	it('should return false if the given input is invalid email', async () => {
		const result = optional(isEmail, 100);
		expect(result).to.be.false;
	});

	it('should return Result.Ok where all optional fields are empty', async () => {
		const validationResult = await validate(adultRule, {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName
		});
		verifyResultOk((result) => {
			expect(result).to.be.eql([]);
		})(validationResult);
	});

	it('should return Result.Ok where all optional fields are filled with valid values', async () => {
		const validationResult = await validate(adultRule, {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			age: user.age
		});
		verifyResultOk((result) => {
			expect(result).to.be.eql([]);
		})(validationResult);
	});

	it('should return Result.Error if the data is not valid', async () => {
		const validationResult = await validate(minorRule, {
			id: '',
			firstName: '',
			lastName: '',
			email: "invalid",
			age: 30
		});
		let errorMsg = [
			'userId should be valid',
			'firstName should not be empty',
			'lastName should not be empty',
			'email should be valid',
			'age should be less then 18'
		];
		verifyResultError((validationError) => {
			expect(validationError).to.be.instanceOf(ApiError);
			expect(validationError.code).to.be.eql(HTTP_CONSTANT.BAD_REQUEST);
			expect(validationError.errorMessage).to.be.eql(errorMsg);
			expect(validationError.error).to.be.eql(errorMsg);
		})(validationResult);
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
