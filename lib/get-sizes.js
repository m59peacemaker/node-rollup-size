const gzipSize = require('gzip-size')
const minify = require('./minify')
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

module.exports = getSizes
