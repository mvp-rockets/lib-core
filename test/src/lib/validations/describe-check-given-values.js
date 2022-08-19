const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const checkGivenValues = require('src/lib/validations/check-given-values');

describe('validations: check given values', () => {
	const sandbox = sinon.createSandbox();
	const defaultValues = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	const positive = 'monday';
	const negative = 'firstDay';

	it('should return true if the given input is in the given values', async () => {
		const result = checkGivenValues(defaultValues)(positive);
		expect(result).to.be.true;
	});

	it('should return false if the given input is not in the given values', async () => {
		const result = checkGivenValues(defaultValues)(negative);
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
