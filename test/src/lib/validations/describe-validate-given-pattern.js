const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const validateGivenPattern = require('src/lib/validations/validate-given-pattern');

describe('validations: validate given pattern', () => {
	const sandbox = sinon.createSandbox();

	const names = /^[a-zA-Z- ']+$/;
	const positive = { type: 'names', input: 'Dansteve Adekanbi', regex: names };
	const negative = { type: 'names', input: 'Species 8472', regex: names };

	it(`should return true for well-formatted ${positive.type} (${positive.input})`, () => {
		const expected = true;
		const actual = validateGivenPattern(positive.regex)(positive.input);

		expect(actual).to.be.equal(expected);
	});

	it(`should return false for badly formatted ${negative.type} (${negative.input})`, () => {
		const expected = false;
		const actual = validateGivenPattern(negative.regex)(negative.input);

		expect(actual).to.be.equal(expected);
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
