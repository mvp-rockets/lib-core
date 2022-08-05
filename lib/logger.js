const winston = require('winston');
require('winston-daily-rotate-file');
//const config = require('config');
const config = require('../config-handler');
const fs = require('fs');

const logDir = './logs';
let transport;

let logger;
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

if (config.enableAwsLogger) {
    const WinstonCloudWatch = require('winston-cloudwatch');
    logger = winston.add(new WinstonCloudWatch({
        logGroupName: config.AwsCloudwatch.logGroupName,
        logStreamName: config.AwsCloudwatch.logStreamName,
        awsAccessKeyId: config.AwsCloudwatch.awsAccessKeyId,
        awsSecretKey: config.AwsCloudwatch.awsSecretKey,
        awsRegion: config.AwsCloudwatch.region,
        messageFormatter: ({ level, message, body }) => `[${level}] : ${message} \nBody: ${JSON.stringify(body)}}`
    }));
} else if (config.enableGoogleLogger) {
    const { LoggingWinston } = require('@google-cloud/logging-winston');
    const loggingWinston = new LoggingWinston({
        projectId: config.logger.project,
        keyFilename: config.logger.keyFile,
        logName: config.logger.logName
    });

    logger = winston.createLogger({
        level: 'info',
        transports: [
            loggingWinston
        ]
    });
} else if (!logger) {
    console.log('Console logger............');
    let logFile = './logs/log';
    if (config.env === 'unitTest') {
        logFile = './logs/test-log';
    }
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
}

module.exports = logger;
