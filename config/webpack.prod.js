const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const babelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const compressionWebackPlugin = require('compression-webpack-plugin');
const brotliWebpackplugin = require('brotli-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/index.js']
  },
  mode: 'production',
  output: {
    filename: 'assets/js/[name]-bundle.js',
    path: path.resolve( __dirname, '../dist'),
    sourceMapFilename: '[file].map'
  },
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
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
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },  
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin([ path.join( __dirname, 'dist' ) ]),
    new htmlWebpackPlugin({
      template: './src/build/pug/index.pug'
    }),
    new miniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: '[id].css' 
    }),
    // active this plugin don't apper the source map to css
    new optimizeCssAssetsWebpackPlugin(),
    // new babelMinifyWebpackPlugin()
    new uglifyJsWebpackPlugin(),
    new brotliWebpackplugin(),
    new compressionWebackPlugin({
      algorithm: 'gzip'
    })
  ]
};