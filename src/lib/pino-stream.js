const fsr = require('file-stream-rotator');

module.exports = () => {
	const logRotationOptions = {
		frequency: 'daily',
		verbose: false,
		date_format: 'YYYY-MM-DD'
	};

	return fsr.getStream({
		filename: './logs/log-%DATE%.log',
		frequency: logRotationOptions.frequency,
		verbose: logRotationOptions.verbose,
		date_format: logRotationOptions.date_format,
		max_logs: '30d' // Optional, maximum number of log files to keep (10 days in this example)
	});
};
