const R = require('ramda');

const unmap = R.curry((properties, _) => properties.group().by(_.key()).by(_.value()));
module.exports = unmap;
