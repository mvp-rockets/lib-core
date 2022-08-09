const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isMobileNumber = require('src/lib/validations/is-mobile-number');
const { factory } = require('test/data/factory');

describe('validations: is mobile number', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return true if the given input is 10 digit', async () => {
		const result = isMobileNumber(user.mobileNumber);
		expect(result).to.be.true;
	});

	it('should return false if the given input is less then 10 digit', async () => {
		const result = isMobileNumber('123');
		expect(result).to.be.false;
	});

	it('should return false if the given input is more then 10 digit', async () => {
		const result = isMobileNumber(`${user.mobileNumber}123`);
		expect(result).to.be.false;
	});

	it('should return false if the given input contain alpha-numeric', async () => {
		const result = isMobileNumber('123456789a');
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
