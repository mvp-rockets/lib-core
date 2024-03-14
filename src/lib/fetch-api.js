const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const Bottleneck = require('bottleneck');
const Result = require('folktale/result');
const logger = require('../lib/utilities/logger')

const FetchAPI = {
    client: axios.create(),
    debounceTimers: {},
    debounceOptions: null,
    limiter: null,
    retries: null,

    setupRetries({ retries }) {
        this.retries = retries;
        const exponentialDelay = retryNumber => Math.pow(2, retryNumber - 1) * 1000; // Exponential delay function
        axiosRetry(this.client, {
            retries,
            retryDelay : exponentialDelay,
            retryCondition: (error) => {
                return axiosRetry.isRetryableError(error) || error.code === 'ECONNABORTED';
            },
        });
    },

    setupRateLimiter(rateLimitOptions) {
        if (rateLimitOptions) {
            this.limiter = new Bottleneck({
                maxConcurrent: rateLimitOptions.maxConcurrent,
                minTime: rateLimitOptions.minTime,
            });
        }
    },

    setupDebounce(debounceOptions) {
        this.debounceOptions = debounceOptions;
    },

    async perform({ url, method = 'get', data = null, headers = {} }, raw = false) {
        const config = {
            url,
            method,
            data,
            headers: {
                ...headers,
                'X-Trace-ID': this.getTraceID(headers),
            },
        };

        if (this.debounceOptions) {
            return this.performWithDebounce(config, raw);
        } else if (this.limiter) {
            return this.limiter.schedule(() => this.makeRequest(config, raw));
        } else {
            return this.makeRequest(config, raw);
        }
    },

    performWithDebounce(config, raw) {
        const { debounceTime = 300 } = this.debounceOptions;
        const key = `${config.method}-${config.url}`;

        return new Promise((resolve, reject) => {
            if (this.debounceTimers[key]) {
                clearTimeout(this.debounceTimers[key]);
            }

            this.debounceTimers[key] = setTimeout(() => {
                this.makeRequest(config, raw).then(resolve).catch(reject);
            }, debounceTime);
        });
    },

    async makeRequest(config, raw) {
        const startTime = Date.now();
        let retryCount = 0;
        try {
            const response = await this.client(config);
            const endTime = Date.now();
            logger.logInfo(`Request to ${config.url} took ${endTime - startTime}ms`);
            const data = raw ? response : response.data;
            return Result.Ok(data);
        } catch (error) {
            // Log each retry attempt
            if (axiosRetry.isRetryableError(error) && retryCount < this.retries) {
                retryCount++;
                logger.logError(`Retry attempt ${retryCount} for ${config.url}`);
            }
            const endTime = Date.now();
            logger.logError(`Request to ${config.url} failed after ${endTime - startTime}ms`)
            return Result.Error(error);
        }
    },

    getTraceID(headers) {
        return headers['x-trace-id'];
    }
};

module.exports = FetchAPI;
