const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const Webpack = require('webpack')
const { HtmlWebpackCombinePlugin } = require('./webpack.plugin')

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  resolve: {
    alias: {
      'jquery': path.resolve(path.join(__dirname, 'node_modules', 'jquery'))
    }
  },
  module: {
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader'
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false,
          interpolate: true
        }
      }]
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: 'images/'
        }
      }]
    },
    {
      test: /\.(woff|woff2|ttf|otf|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: 'fonts/'
        }
      }]
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      }, {
        loader: 'expose-loader',
        options: '$'
      }]
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackCombinePlugin({
      pages: [
        'index.html',
        'register.html',
        'login.html',
        'register2.html',
        'news.html',
        'news-details.html',
        'party-list.html',
        'settings.html',
        'donate.html',
        'donate-fail.html',
        'donate-success.html',
        'our-vision.html',
        'our-team.html',
        'board.html',
        'contact.html',
        'girchi-school.html'
      ],
      path: './src'
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as (entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return 'font'
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle-[hash].css',
      chunkFilename: '[id].css'
    }),
    new Webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })

  ],
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
}
