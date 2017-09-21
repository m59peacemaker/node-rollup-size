const path = require('path')

const pify = require('pify')
const getPackageDir = pify(require('get-package-dir'))
const bundle = require('./lib/bundle')
const minify = require('./lib/minify')
const gzipSize = require('gzip-size')

const rollupSize = async packageName => {
  const packageDir = await getPackageDir(packageName)
  const pkg = require(path.join(packageDir, 'package.json'))
  const entry = pkg.module || pkg.main || 'index.js'
  const code = await bundle(path.join(packageDir, entry))
  // TODO: make gzip an option?
    //return Buffer.byteLength(minify(code), 'utf8')
  return await gzipSize(minify(code))
}

module.exports = rollupSize
