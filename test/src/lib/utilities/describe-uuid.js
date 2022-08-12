const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const uuid = require('src/lib/utilities/uuid');
const validate = require('uuid-validate');

describe('utilities: uuid', () => {
	const sandbox = sinon.createSandbox();

	it('should return execute given function and return result', async () => {
		const generatedUuid = uuid.v4();
		expect(validate(generatedUuid)).to.be.true;
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
