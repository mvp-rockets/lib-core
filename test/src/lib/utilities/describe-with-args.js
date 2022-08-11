const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const withArgs = require('src/lib/utilities/with-args');

const getFullName = async (user) => `${user.firstName} ${user.lastName}`;

describe('utilities: with args', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return execute given function and return result', async () => {
		const returnResult = await withArgs(getFullName, user)();
		expect(returnResult).to.be.eql(`${user.firstName} ${user.lastName}`);
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
