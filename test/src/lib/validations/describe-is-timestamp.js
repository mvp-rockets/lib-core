const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isTimestamp = require('src/lib/validations/is-timestamp');

describe('validations: is timestamp', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given timestamp is valid', async () => {
		const result = isTimestamp(new Date().getTime());
		expect(result).to.be.true;
	});

	it('should return false if the given timestamp is not valid', async () => {
		const result = isTimestamp(new Date());
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
