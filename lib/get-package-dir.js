const pify = require('pify')
module.exports = pify(require('get-package-dir'))
