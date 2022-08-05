const jwt = require('jsonwebtoken');
const config = require('../config-handler');
const Result = require('folktale/result');

exports.generate = function (details) {
    return new Promise((resolve, reject) => {
        jwt.sign(details, config.jwt_secret, { algorithm: 'HS256' }, (err, token) => {
            if (err) {
                reject(Result.Error(err));
            } else {
                resolve(Result.Ok(token));
            }
        });
    });
};

exports.decode = function (token, next) {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        next(err, decoded);
    });
};
