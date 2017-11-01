const path = require('path')
const tryCatch = require('try_catch')
const bundle = require('./lib/bundle-rollup')
const getSizes = require('./lib/get-sizes')
const getPackageDir = require('./lib/get-package-dir')

const determineEntry = packageDir => {
  const pkg = tryCatch(
    () => require(path.join(packageDir, 'package.json')),
    () => ({})
  )
  const pkgEntry = pkg.module || pkg.main
  return pkgEntry
    ? path.join(packageDir, pkgEntry)
    : require.resolve(packageDir)
}

const rollupSize = async packageName => {
  const packageDir = await getPackageDir(packageName)
  const entry = determineEntry(packageDir)
  const code = await bundle(entry)
  return await getSizes(code)
}

module.exports = rollupSize
