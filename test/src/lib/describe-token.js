const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { verifyResultOk, verifyResultError } = require('helpers/verifiers');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const { token } = require('index');
const whenResult = require('src/lib/utilities/whenResult');

describe('token', () => {
	const sandbox = sinon.createSandbox();
	let user;
	let jwt;
	beforeEach(async () => {
		user = await factory.build('user');
		jwt = await factory.build('jwt');
	});

	it('should generate & decode token', async () => {
		token.initialize(jwt.key);
		const userTokenResult = await token.generate(user);
		verifyResultOk((userToken) => {
			expect(userToken).to.be.not.null;
		})(userTokenResult);

		whenResult(
			async (userToken) => {
				const decodedUserInfoResult = await token.decode(userToken);
				verifyResultOk((decodedUserInfo) => {
					expect(decodedUserInfo.id).to.be.eql(user.id);
					expect(decodedUserInfo.name).to.be.eql(user.name);
				})(decodedUserInfoResult);
			}
		)(userTokenResult);
	});

	context('error', () => {
		it('should return error if jwt token is not present', async () => {
			token.initialize();
			const userTokenResult = await token.generate(user);
			verifyResultError((error) => {
				expect(error).to.be.eql('Jwt key not provided');
			})(userTokenResult);

			const decodedUserInfoResult = await token.decode('sample token');
			verifyResultError((error) => {
				expect(error).to.be.eql('Jwt key not provided');
			})(decodedUserInfoResult);
		});

		it('should return error if jwt token is diff', async () => {
			token.initialize(jwt.key);
			const userTokenResult = await token.generate(user);
			whenResult(
				async (userToken) => {
					const jwt2 = await factory.build('jwt');
					token.initialize(jwt2.key);
					const decodedUserInfoResult = await token.decode(userToken);
					verifyResultError((error) => {
						expect(error).to.be.not.null;
					})(decodedUserInfoResult);
				}
			)(userTokenResult);
		});
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
