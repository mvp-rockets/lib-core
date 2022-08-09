const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const maxValue = require('src/lib/validations/max-value');

describe('validations: max value', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is less the max value', async () => {
		const result = maxValue(10, 9);
		expect(result).to.be.true;
	});

	it('should return true if the given input is equal to the max value', async () => {
		const result = maxValue(10, 10);
		expect(result).to.be.true;
	});

	it('should return false if the given input is more then max value', async () => {
		const result = maxValue(10, 11);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
