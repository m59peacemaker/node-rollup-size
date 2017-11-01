const browserify = require('browserify')
const pify = require('pify')

const browserifyBundle = dir => pify(cb => browserify(dir).bundle(cb))()
  .then(code => code.toString())

module.exports = browserifyBundle
