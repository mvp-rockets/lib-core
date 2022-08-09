const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const shoudBeUUID = require('src/lib/validations/should-be-uuid');
const { factory } = require('test/data/factory');

describe('validations: should be uuid', () => {
	const sandbox = sinon.createSandbox();
	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return true if the given input is uuid', async () => {
		const result = shoudBeUUID(user.id);
		expect(result).to.be.true;
	});

	it('should return false if the given input is not uuid', async () => {
		const result = shoudBeUUID(user.age);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
