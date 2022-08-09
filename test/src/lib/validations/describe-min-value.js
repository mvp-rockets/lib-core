const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const minValue = require('src/lib/validations/min-value');

describe('validations: min value', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is more then min value', async () => {
		const result = minValue(10, 11);
		expect(result).to.be.true;
	});

	it('should return false if the given input is less the min value', async () => {
		const result = minValue(10, 9);
		expect(result).to.be.false;
	});

	it('should return true if the given input is equal to the min value', async () => {
		const result = minValue(10, 10);
		expect(result).to.be.true;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
