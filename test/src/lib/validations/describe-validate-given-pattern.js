const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const validateGivenPattern = require('src/lib/validations/validate-given-pattern');

describe('validations: validate given pattern', () => {
	const sandbox = sinon.createSandbox();

	const names = /^[a-zA-Z- ']+$/;
	const zipCodes = /^[0-9']{5}$/;
	const dates = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	const ifsCodes = /^[A-Za-z]{4}\d{7}$/;

	const positive = [
		{ type: 'names', input: 'Dansteve la forge', regex: names },
		{ type: 'names', input: 'Jean-Luc Picard', regex: names },
		{ type: 'names', input: 'WILLIAM RIKER', regex: names },
		{ type: 'zipcodes', input: '12345', regex: zipCodes },
		{ type: 'dates', input: '2019-01-01', regex: dates },
		{ type: 'ifsCodes', input: 'ABCD1234567', regex: ifsCodes }
	];

	const negative = [
		{ type: 'names', input: 'Species 8472', regex: names },
		{ type: 'names', input: 'picard@enterprise.com', regex: names },
		{ type: 'names', input: 'WILLIAM RIKER !!!!', regex: names },
		{ type: 'zipcodes', input: '12', regex: zipCodes },
		{ type: 'zipcodes', input: '1234567', regex: zipCodes },
		{ type: 'dates', input: '2019-01-DD', regex: dates },
		{ type: 'ifsCodes', input: '124ABCD12345678', regex: ifsCodes }
	];

	positive.forEach((item) => {
		const { type, input, regex } = item;
		it(`should return true for well-formatted ${type} (${input})`, () => {
			const expected = true;
			const actual = validateGivenPattern(regex)(input);

			expect(actual).to.be.equal(expected);
		});
	});

	negative.forEach((item) => {
		const { type, input, regex } = item;
		it(`should return false for badly formatted ${type} (${input})`, () => {
			const expected = false;
			const actual = validateGivenPattern(regex)(input);

			expect(actual).to.be.equal(expected);
		});
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
