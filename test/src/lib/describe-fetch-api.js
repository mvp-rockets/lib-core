const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const ExternalAPIWrapper = require('../../../src/lib/external-API-wrapper');
const { verifyResultOk, verifyResultError, verifyError } = require('helpers/verifiers');
const { resolveError, resolveDbResult } = require('helpers/resolvers');
const expect = chai.expect;

describe('ExternalAPIWrapper', () => {
    let axiosInstance;
    const sandbox = sinon.createSandbox();


    beforeEach(() => {
        axiosInstance = axios.create();
    });

    afterEach(() => {
        sandbox.verifyAndRestore();
        sinon.verifyAndRestore();
        sinon.restore();
    });

    it('performs a request successfully', async () => {
        const responseData = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'get',
        };

        sandbox.stub(axiosInstance, 'request').resolves({ data: responseData });

        const finalResult = await ExternalAPIWrapper.perform(requestConfig);

        verifyResultOk((result) => {
            expect(result).to.eql(responseData);
		})(finalResult);

    });


    it('handles request failure', async () => {
        // const error = new Error('Mocked error');
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos/1111',
            method: 'get',
            // other optional parameters like data, headers, traceID, etc.
        };

        sandbox.stub(axiosInstance, 'request').returns(resolveError('Mocked Error'));

        const finalResult = await ExternalAPIWrapper.perform(requestConfig);

            verifyResultError((error) => {
                expect(error.response.statusText).to.be.eql('Not Found');
            })(finalResult);

    });

    it('performs a request with custom headers', async () => {
        const responseData = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
        const customHeaders = {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        };
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'get',
            headers: customHeaders,
        };

        sinon.stub(axiosInstance, 'request').resolves({ data: responseData });

        const result = await ExternalAPIWrapper.perform(requestConfig);
        expect(result.value).to.eql(responseData);
    });

    it('performs a request with a custom traceID', async () => {
        const responseData = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
        const customTraceID = 'custom-trace-id';
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'get',
            headers: { 'X-Trace-ID': customTraceID }
        };

        sinon.stub(axiosInstance, 'request').resolves({ data: responseData });

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.eql(responseData);
    });

    it('retries request according to the retry options', async () => {
        const responseData = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
        const retryOptions = { retries: 3, retryDelay: 100 };
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'get',
            headers: retryOptions
        };

        // Stub axios to reject the first few times and resolve on later attempts
        sandbox.stub(axiosInstance, 'request').onCall(0).rejects(new Error('Mocked error'));
        // sandbox.stub(axiosInstance, 'request').resolves({ data: responseData });

        const result = await ExternalAPIWrapper.perform(requestConfig);

        // expect(result.isOk()).to.be.true;
        expect(result.value).to.eql(responseData);
    });

    it('delays request execution according to the debounce options', async () => {
        const responseData = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
        const debounceOptions = { debounceTime: 167 };
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'get',
            headers: {
                debounceTime:300
            }
        };

        // Stub axios to resolve immediately
        sinon.stub(axiosInstance, 'request').resolves({ data: responseData });

        const startTime = Date.now();
        await Promise.all([
            ExternalAPIWrapper.perform(requestConfig),
            ExternalAPIWrapper.perform(requestConfig),
            ExternalAPIWrapper.perform(requestConfig)
        ]);
        const endTime = Date.now();

        const elapsedTime = endTime - startTime;
        // Expect the time taken for requests to be greater than or equal to the debounce time
        expect(elapsedTime).to.be.at.least(debounceOptions.debounceTime);
    });

    it('handles request failure after all retries', async () => {
        const retryOptions = { retries: 2, retryDelay: 100 };
        const requestConfig = {
            url: 'https://api.example.com/data',
            method: 'get',
            headers: retryOptions
        };

        // Stub axios to always reject
        sinon.stub(axiosInstance, 'request').rejects(new Error('Mocked error'));

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.be.an.instanceOf(Error);
    });

    it('does not debounce if debounce options are not provided', async () => {
        const responseData = 'Mocked response';
        const requestConfig = {
            url: 'https://api.example.com/data',
            method: 'get',
        };

        // Stub axios to resolve immediately
        sinon.stub(axiosInstance, 'request').resolves({ data: responseData });

        const startTime = Date.now();
        await Promise.all([
            ExternalAPIWrapper.perform(requestConfig),
            ExternalAPIWrapper.perform(requestConfig),
            ExternalAPIWrapper.perform(requestConfig)
        ]);
        const endTime = Date.now();

        const elapsedTime = endTime - startTime;
        // Expect the time taken for requests to be minimal
        expect(elapsedTime).to.be.at.most(25);
    });

    it('returns error for invalid request configurations', async () => {
        const requestConfig = {
            // Missing URL, method, etc.
        };

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.be.an.instanceOf(Error);
    });

    it('returns error if request execution fails due to network error', async () => {
        const requestConfig = {
            url: 'https://api.example.com/data',
            method: 'get',
            // other optional parameters like data, headers, traceID, etc.
        };

        // Stub axios to throw a network error
        sinon.stub(axiosInstance, 'request').rejects({ code: 'ENOTFOUND' });

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.be.an.instanceOf(Error);
        expect(result.value.code).to.equal('ENOTFOUND');
    });

    it('performs a request with custom data', async () => {
        const responseData = { id:201, title: 'Learn JS' };
        const requestData = { title: 'Learn JS' };
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todos',
            method: 'post',
            data: requestData,
        };

        // Stub axios to resolve immediately
        sinon.stub(axiosInstance, 'request').resolves({ data: responseData });

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.eql(responseData);
    });

    it('handles request failure due to server error', async () => {
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/todo/21222',
            method: 'get',
        };

        // Stub axios to reject with a server error (status code 500)
        sinon.stub(axiosInstance, 'request').rejects({ response: { status: 500 } });

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.be.an.instanceOf(Error);
    });


    it('performs a request with custom headers and traceID', async () => {
        const responseData = {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          };
        const customHeaders = {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        };
        const customTraceID = 'custom-trace-id';
        const requestConfig = {
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'get',
            headers: customHeaders,
            traceID: customTraceID,
        };

        // Stub axios to resolve immediately
        sinon.stub(axiosInstance, 'request').resolves({ data: responseData });

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.eql(responseData);
    });

    it('handles request failure due to invalid URL', async () => {
        const requestConfig = {
            url: '', // Invalid URL
            method: 'get',
        };

        const result = await ExternalAPIWrapper.perform(requestConfig);

        expect(result.value).to.be.an.instanceOf(Error);
    });
});
