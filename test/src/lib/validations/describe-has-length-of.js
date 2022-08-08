const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const hasLengthOf = require('src/lib/validations/has-length-of');
const { factory } = require('test/data/factory');

describe('validations: has length of', () => {
	const sandbox = sinon.createSandbox();
	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return true if the given length and comparison string length is equal', async () => {
		const result = hasLengthOf(user.firstName.length, user.firstName);
		expect(result).to.be.true;
	});

	it('should return false if the given length and comparison string length is not equal', async () => {
		const result = hasLengthOf(user.firstName.length, `${user.firstName} ${user.lastName}`);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
