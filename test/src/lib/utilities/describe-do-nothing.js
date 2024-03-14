const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const doNothing = require('src/lib/utilities/doNothing');

console.log(doNothing, typeof doNothing);

describe('utilities: doNothing', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should return result', async () => {
		const returnResult = doNothing(user);
		expect(returnResult).to.be.Arguments;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
