const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const isLatLong = require('src/lib/validations/is-latlong');

describe('validations: is Latitude Longitude', () => {
	const sandbox = sinon.createSandbox();

	it('should return true if the given input is valid latitude longitude in decimal', async () => {
		const result = isLatLong("11.770570, -162.949219");
		expect(result).to.be.true;
	});

    it('should return false if the given input is not valid latitude longitude in decimal', async () => {
		const result = isLatLong("89.9999999989, 360.0000000");
		expect(result).to.be.false;
	});

    it('should return true if the given input is valid latitude longitude in degrees minutes and seconds', async () => {
		const result = isLatLong("11° 0′ 0.005″ S, 180° 0′ 0″ E", false);
		expect(result).to.be.true;
	});

    it('should return false if the given input is not valid latitude longitude in degrees minutes and seconds', async () => {
		const result = isLatLong("40° 89′ 46″ S, 79° 58′ 100″ E", false);
		expect(result).to.be.false;
	});

	it('should return false if the given input does not contains both the pair of values', async () => {
		const result = isLatLong("11.770570");
		expect(result).to.be.false;
	});

	it('should return true if the given input is enclosed in brackets and contain decimal values', async () => {
		const result = isLatLong("(11.770570, -162.949219)");
		expect(result).to.be.true;
	});

	it('should return false if the given input does not close brackets properly', async () => {
		const result = isLatLong("(11.770570, -162.949219");
		expect(result).to.be.false;
	});
	it('should return false if the given input does not open with brackets but closes with one', async () => {
		const result = isLatLong("11.770570, -162.949219)");
		expect(result).to.be.false;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
