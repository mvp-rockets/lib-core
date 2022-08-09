const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isBoolean = require('src/lib/validations/is-boolean');

describe('validations: is boolean', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input true', async () => {
		const result = isBoolean(true);
		expect(result).to.be.true;
	});

	it('should return true if the given input is false', async () => {
		const result = isBoolean(false);
		expect(result).to.be.true;
	});

	it('should return false if the given input not bool type', async () => {
		const result = isBoolean('true');
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
