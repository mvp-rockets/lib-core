const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const args = require('src/lib/utilities/args');

describe('utilities: args', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return result', async () => {
		const returnResult = await args(user)();
		expect(returnResult).to.be.eql(user);
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
