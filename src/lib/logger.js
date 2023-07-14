const winston = require('winston');
const pino = require('pino');
require('winston-daily-rotate-file');
const fs = require('fs');

const config = {};
const logDir = './logs';
let transport;

let logger;

const initPino = () => {
	const loggersAvailable = {
		file: {
			target: './pino-stream'
		},
		cloudwatch: {
			target: '@serdnam/pino-cloudwatch-transport',
			options: {
				logGroupName: config.providerConfig.logGroupName,
				logStreamName: config.providerConfig.logStreamName,
				awsRegion: config.providerConfig.region,
				awsAccessKeyId: config.providerConfig.accessKeyId,
				awsSecretAccessKey: config.providerConfig.secretKey,
				interval: config.providerConfig.interval || 10
			}
		},
		terminal: {
			target: 'pino-pretty',
			options: {
				colorize: true
			}
		}
	};

	let targets = [];
	let loggerOptions = (config.loggerOptions || '');

	if (config.enableDevLog) {
		targets = [
			loggersAvailable.terminal
		];

		if (loggerOptions.includes('terminal')) {
			loggerOptions = loggerOptions.replace('terminal', '');
		}
	}

	const enabledLoggers = loggerOptions.split(/,\s*/g);

	if (enabledLoggers.includes('file')) {
		if (!fs.existsSync(logDir)) {
			fs.mkdirSync(logDir);
		}
	}

	enabledLoggers.forEach((loggerType) => {
		if (loggersAvailable[loggerType]) {
			targets.push(loggersAvailable[loggerType]);
		}
	});

	const pinoTransport = pino.transport({
		targets
	});

	logger = pino(pinoTransport);
};

const reload = () => {
	if (config.loggerType === 'pino') {
		initPino();
		return;
	}

	if (config.isEnable && config.type === 'aws') {
		const WinstonCloudWatch = require('winston-cloudwatch');
		const AWS = require('aws-sdk');
		AWS.config.update({
			region: config.providerConfig.region,
			accessKeyId: config.providerConfig.accessKeyId,
			secretAccessKey: config.providerConfig.secretKey
		});
		logger = winston.add(new WinstonCloudWatch({
			cloudWatchLogs: new AWS.CloudWatchLogs(),
			logGroupName: config.providerConfig.logGroupName,
			logStreamName: config.providerConfig.logStreamName,
			jsonMessage: true
		}));
	} else if (config.isEnable && config.type === 'google') {
		const { LoggingWinston } = require('@google-cloud/logging-winston');
		const loggingWinston = new LoggingWinston({
			projectId: config.providerConfig.project,
			keyFilename: config.providerConfig.keyFile,
			logName: config.providerConfig.logStreamName
		});
		logger = winston.createLogger({
			level: 'info',
			transports: [
				loggingWinston
			]
		});
	} else if (config.type === 'file') {
		if (!fs.existsSync(logDir)) {
			fs.mkdirSync(logDir);
		}
		const logFile = `./logs/${config.environment || 'log'}`;
		transport = new (winston.transports.DailyRotateFile)({
			filename: logFile,
			datePattern: 'YYYY-MM-DD',
			prepend: true,
			json: true,
			colorize: true,
			level: 'debug'
		});

		logger = winston.createLogger({
			transports: [
				transport
			]
		});
	} else if (!logger) {
		logger = winston.add(new winston.transports.Console({
			format: winston.format.simple()
		}));
	}
};

module.exports.initialize = ({
	type, configurations, environment, isEnable, clsNameSpace, loggerType = 'winston', loggerOptions = '', enableDevLog
}) => {
	config.type = type;
	config.providerConfig = configurations;
	config.environment = environment;
	config.isEnable = isEnable;
	config.clsNameSpace = clsNameSpace;
	config.loggerType = loggerType;
	config.loggerOptions = loggerOptions;
	config.enableDevLog = enableDevLog;

	reload();
};

module.exports.getLogger = () => {
	if (!logger) {
		reload();
		return logger;
	}
	return logger;
};

module.exports.getConfig = () => config;
