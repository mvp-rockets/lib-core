const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const notEmpty = require('src/lib/validations/not-empty');

describe('validations: not empty', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is not empty', async () => {
		const result = notEmpty('Test');
		expect(result).to.be.true;
	});

	it('should return true if the given input is not empty array', async () => {
		const result = notEmpty([1, 2]);
		expect(result).to.be.true;
	});

	it('should return false if the given input is undefined', async () => {
		const result = notEmpty(undefined);
		expect(result).to.be.false;
	});

	it('should return false if the given input is empty', async () => {
		const result = notEmpty();
		expect(result).to.be.false;
	});

	it('should return false if the given input is null', async () => {
		const result = notEmpty(null);
		expect(result).to.be.false;
	});

	it('should return false if the given input is empty array', async () => {
		const result = notEmpty([]);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
