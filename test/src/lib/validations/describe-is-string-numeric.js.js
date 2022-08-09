const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isStringNumeric = require('src/lib/validations/is-string-numeric');

describe('validations: is string numeric', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is numeric', async () => {
		const result = isStringNumeric('1234');
		expect(result).to.be.true;
	});

	it('should return false if the given input is not numeric', async () => {
		const result = isStringNumeric('123a');
		expect(result).to.be.false;
	});


	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
