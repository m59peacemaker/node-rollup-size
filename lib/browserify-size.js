const getPackageDir = require('./get-package-dir')
const bundle = require('./bundle-browserify')
const getSizes = require('./get-sizes')

const browserifySize = packageName => getPackageDir(packageName)
  .then(bundle)
  .then(getSizes)

module.exports = browserifySize
