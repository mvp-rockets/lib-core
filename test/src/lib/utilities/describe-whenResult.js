const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const whenResult = require('src/lib/utilities/whenResult');
const Result = require('folktale/result');

const getFullName = ((firstName, lastName) => `${firstName} ${lastName}`);

describe('utilities: when result', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should execute success function if the supplied args is Result.Ok', async () => {
		whenResult(
			(userInfo) => {
				const fullName = getFullName(userInfo.firstName, userInfo.lastName);
				expect(fullName).to.be.eql(`${userInfo.firstName} ${userInfo.lastName}`);
			}
		)(Result.Ok(user));
	});

	it('should execute the failure function if the supplied args is Result.Error', async () => {
		whenResult(
			(userInfo) => {
				// ! For current test case flow will not come here as we are testing failure function
				const fullName = getFullName(userInfo.firstName, userInfo.lastName);
				expect(fullName).to.be.eql(`${userInfo.firstName} ${userInfo.lastName}`);
			},
			(error) => {
				expect(error).to.be.eql('some error');
			}
		)(Result.Error('some error'));
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
