const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isUndefined = require('src/lib/validations/is-undefined');

describe('validations: is undefined', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is undefined', async () => {
		const result = isUndefined(undefined);
		expect(result).to.be.true;
	});

	it('should return false if the given input is not undefined', async () => {
		const result = isUndefined('undefined');
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
