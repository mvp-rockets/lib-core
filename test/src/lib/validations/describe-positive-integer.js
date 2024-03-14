const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const integer = require('src/lib/validations/positive-integer');
const { factory } = require('test/data/factory');

describe('validations: positive-integer', () => {
	const sandbox = sinon.createSandbox();
	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return true if the given input is a positive number', async () => {
		const result = integer(user.age);
		expect(result).to.be.true;
	});

	it('should return false if the given input is not a number', async () => {
		const result = integer(user.id);
		expect(result).to.be.false;
	});

	it('should return false if the given input is less then zero', async () => {
		const result = integer(-10);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
