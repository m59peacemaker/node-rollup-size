const path = require('path')

const pify = require('pify')
const getPackageDir = pify(require('get-package-dir'))
const bundle = require('./lib/bundle')
const minify = require('./lib/minify')
const gzipSize = require('gzip-size')
const browserify = require('browserify')
const browserifyBundle = dir => pify(cb => browserify(dir).bundle(cb))()
  .then(code => code.toString())
const byteSize = string => Buffer.byteLength(string, 'utf8')

const getSizes = async bundleCode => {
  const minifiedCode = minify(bundleCode)
  return {
    code: bundleCode,
    bytes: byteSize(bundleCode),
    minified: byteSize(minifiedCode),
    gzipped: await gzipSize(minifiedCode)
  }
}

const rollupSize = async packageName => {
  const packageDir = await getPackageDir(packageName)
  const pkg = require(path.join(packageDir, 'package.json'))
  const entry = pkg.module || pkg.main || 'index.js'
  const code = await bundle(path.join(packageDir, entry))
  const browserifyCode = await browserifyBundle(packageDir)

  return {
    rollup: await getSizes(code),
    browserify: await getSizes(browserifyCode),
  }
  // TODO: make gzip an option?
  //return await gzipSize(minify(code))
}

module.exports = rollupSize
