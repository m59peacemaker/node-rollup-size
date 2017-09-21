const uglify = require('uglify-es')
const minify = code => {
  const { error, code: minifiedCode } = uglify.minify(code)
  if (error) {
    throw error
  }
  return minifiedCode
}

module.exports = minify
