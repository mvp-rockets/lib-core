const jwt = require('jsonwebtoken');
const Result = require('folktale/result');

let jwtSecretKey = '';
module.exports.initialize = (key) => {
	jwtSecretKey = key;
};

module.exports.generate = (details) => new Promise((resolve, reject) => {
	jwt.sign(details, jwtSecretKey, { algorithm: 'HS256' }, (err, token) => {
		if (err) {
			reject(Result.Error(err));
		} else {
			resolve(Result.Ok(token));
		}
	});
});

module.exports.decode = (token, next) => {
	jwt.verify(token, jwtSecretKey, (err, decoded) => {
		next(err, decoded);
	});
};
