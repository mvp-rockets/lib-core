const { factory } = require('factory-girl');

factory.define('user', Object, {
	id: factory.chance('guid'),
	firstName: factory.chance('first'),
	lastName: factory.chance('last'),
	mobileNumber: factory.chance('phone', { formatted: false }),
	age: factory.chance('age')
});

factory.define('jwt', Object, {
	key: factory.chance('hash', { length: 25 })
});

module.exports.factory = factory;
