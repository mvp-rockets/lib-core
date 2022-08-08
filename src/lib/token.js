const jwt = require('jsonwebtoken');
const Result = require('folktale/result');
const R = require('ramda');

let jwtSecretKey = '';
module.exports.initialize = (key) => {
	jwtSecretKey = key;
};

module.exports.generate = (details) => new Promise((resolve) => R.ifElse(
	() => !R.isNil(jwtSecretKey) && !R.isEmpty(jwtSecretKey),
	() => jwt.sign(details, jwtSecretKey, { algorithm: 'HS256' }, (err, token) => {
		if (err) {
			resolve(Result.Error(err));
		} else {
			resolve(Result.Ok(token));
		}
	}),
	() => resolve(Result.Error('Jwt key not provided'))
)());

module.exports.decode = (token) => new Promise((resolve) => R.ifElse(
	() => !R.isNil(jwtSecretKey) && !R.isEmpty(jwtSecretKey),
	() => jwt.verify(token, jwtSecretKey, (err, decoded) => {
		if (err) {
			resolve(Result.Error(err));
		} else {
			resolve(Result.Ok(decoded));
		}
	}),
	() => resolve(Result.Error('Jwt key not provided'))
)());
