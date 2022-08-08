const { factory } = require('factory-girl');

factory.define('user', Object, {
	id: factory.chance('guid'),
	name: factory.chance('name')
});

factory.define('jwt', Object, {
	key: factory.chance('hash', { length: 25 })
});

module.exports.factory = factory;
