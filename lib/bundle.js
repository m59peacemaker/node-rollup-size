const rollup = require('rollup').rollup
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const Plugins = () => [
  resolve({
    module: true, browser: true, jsnext: true, main: true, extensions: [ '.js', '.json' ]
  }),
  commonjs(),
]

const bundle = async file => {
  const bundle = await rollup({ input: file, plugins: Plugins() })
  const { code } = await bundle.generate({ format: 'es', sourcemap: false })
  return code
}

module.exports = bundle
