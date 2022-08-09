const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const numeric = require('src/lib/validations/numeric');
const { factory } = require('test/data/factory');

describe('validations: numeric', () => {
	const sandbox = sinon.createSandbox();
	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return true if the given input is numeric', async () => {
		const result = numeric(user.age);
		expect(result).to.be.true;
	});

	it('should return false if the given input is not numeric', async () => {
		const result = numeric(user.id);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
