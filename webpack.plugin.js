const Prettier = require('prettier')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Prettier Plugin
class PrettierPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('Prettier', (compilation) => {
      for (const filename in compilation.assets) {
        if (filename.indexOf('.html') === -1) {
          continue
        }
        const asset = compilation.assets[filename]
        const size = asset.size()
        const source = asset.source()
        const formattedSource = Prettier.format(source, { parser: 'html' })

        compilation.assets[filename] = {
          source: function () {
            return formattedSource
          },
          size: function () {
            return size
          }
        }
      }

      return true
    })
  }
}

// HtmlWebpackCombine Plugin
class HtmlWebpackCombinePlugin {
  constructor (config = { pages: [], path: '.' }) {
    this.pages = config.pages
    this.path = config.path
  }
  apply (compiler) {
    const path = this.path

    this.pages.forEach((page) => {
      const Plugin = new HtmlWebpackPlugin({
        filename: page,
        template: `${path}/${page}`
      })

      Plugin.apply(compiler)
    })
  }
}

module.exports = {
  PrettierPlugin,
  HtmlWebpackCombinePlugin
}
