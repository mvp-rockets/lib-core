const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isEmail = require('src/lib/validations/is-email');
const { factory } = require('test/data/factory');

describe('validations: is email', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return true if the given input is valid email', async () => {
		const result = isEmail(user.email);
		expect(result).to.be.true;
	});

	it('should return false if the given input is not valid email', async () => {
		const result = isEmail(user.firstName);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
