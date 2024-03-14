const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isString = require('src/lib/validations/is-string');

describe('validations: is string', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is a numeric string', async () => {
		const result = isString('1234');
		expect(result).to.be.true;
	});

	it('should return true if the given input contains a-z', async () => {
		const result = isString('abcdEFGHI');
		expect(result).to.be.true;
	});

	it('should return false if the given input is null', async () => {
		const result = isString(null);
		expect(result).to.be.false;
	});

	it('should return false if the given input is a number', async () => {
		const result = isString(1234);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
