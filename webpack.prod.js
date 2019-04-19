const merge = require('webpack-merge')
const prettier = require('prettier')
const path = require('path')
const common = require('./webpack.common.js')
const glob = require('glob-all')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const CompressionPlugin = require('compression-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(css|js)(\?.*)?$/i // only compressed css/js, skips compressing sourcemaps etc
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle: { // lossless gif compressor
        optimizationLevel: 9
      },
      pngquant: ({ // lossy png compressor, remove for default lossless
        quality: '75'
      }),
      plugins: [imageminMozjpeg({ // lossy jpg compressor, remove for default lossless
        quality: '75'
      })]
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        `${path.join(__dirname, 'src')}/*.html`,
        `${path.join(__dirname, 'src')}/**/*.js`,
        `${path.join(__dirname, 'node_modules/bootstrap')}/**/*.js`,
        `${path.join(__dirname, 'node_modules/owl.carousel2')}/**/*.js`,
      ])
    }),
    {
      apply (compiler) {
        compiler.hooks.emit.tap('Prettier', (compilation) => {
          for (const filename in compilation.assets) {
            if (filename.indexOf('.html') === -1) {
              continue
            }
            const asset = compilation.assets[filename]
            const size = asset.size()
            const source = asset.source()
            const formattedSource = prettier.format(source, { parser: 'html' })

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
  ]
})
