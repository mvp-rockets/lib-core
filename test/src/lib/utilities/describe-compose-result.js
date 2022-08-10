const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { factory } = require('test/data/factory');
const composeResult = require('src/lib/utilities/compose-result');
const Result = require('folktale/result');
const { verifyResultOk, verifyResultError } = require('helpers/verifiers');

const updateUserWithGreeting = (async (greeting, user) => {
	const updatedUser = {
		id: user.id,
		fullName: user.fullName,
		greeting
	};
	return Result.Ok(updatedUser);
});

const updateUserWithGreetingWithOutFolkTaleResult = (async (greeting, user) => ({
	id: user.id,
	fullName: user.fullName,
	greeting
}));

const updateUserWithGreetingWithError = (async (greeting, user) => Result.Error('some error'));

const updateUserFullName = (async (user) => {
	const fullName = `${user.firstName} ${user.lastName}`;
	const updatedUser = {
		id: user.id,
		fullName
	};
	return Result.Ok(updatedUser);
});

describe('utilities: compose result', () => {
	const sandbox = sinon.createSandbox();

	let user;
	beforeEach(async () => {
		user = await factory.build('user');
	});

	it('should execute successfully and return Result.Ok if all the given function execute successfully', async () => {
		const finalResult = await composeResult(
			(userWithFullName) => updateUserWithGreeting('Hello', userWithFullName),
			(userInfo) => updateUserFullName(userInfo)
		)(user);
		verifyResultOk((result) => {
			expect(result).to.be.eql({
				id: user.id,
				fullName: `${user.firstName} ${user.lastName}`,
				greeting: 'Hello'
			});
		})(finalResult);
	});

	it('should execute successfully and return Result.Ok if only one function is present', async () => {
		const finalResult = await composeResult(
			(userInfo) => updateUserFullName(userInfo)
		)(user);
		verifyResultOk((result) => {
			expect(result).to.be.eql({
				id: user.id,
				fullName: `${user.firstName} ${user.lastName}`
			});
		})(finalResult);
	});

	it('should execute successfully and return Result.Error if one of the function return Result.Error', async () => {
		const finalResult = await composeResult(
			(userWithFullName) => updateUserWithGreetingWithError('Hello', userWithFullName),
			(userInfo) => updateUserFullName(userInfo)
		)(user);
		verifyResultError((error) => {
			expect(error).to.be.eql('some error');
		})(finalResult);
	});

	it('should return error if no arguments in provided', async () => {
		try {
			await composeResult()();
		} catch (ex) {
			expect(ex).to.be.instanceOf(Error);
			expect(ex.message).to.be.eql('onSuccess requires at least one argument');
		}
	});
	afterEach(() => {
		sandbox.verifyAndRestore();
	});
});
