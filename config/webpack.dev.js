const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const modernizrWebpackPlugin = require('modernizr-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const configMorenizr = require('./modernizr.config.js');


module.exports = {
  entry: {
    index: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.js'
    ]
  },
  mode:"development",
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'dist',
    overlay: true,
    hot:true,
    stats: {
      colors: true
    }
  },
  module: {
    rules: [
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
        test: /\.(scss|sass)$/,
        use: [          
          {
            loader: 'file-loader?name=[name].css'
          },
          {
            loader: 'extract-loader'
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
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtractPlugin(),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/build/pug/index.pug'
    }),
    new htmlWebpackPlugin({
      filename: 'contact.html',
      template:  './src/build/pug/contact.pug'
    }), 
    new htmlWebpackIncludeAssetsPlugin({
      files: ['contact.html'],
      assets: ['contact.css'],
      append: true
    }),
    new htmlWebpackIncludeAssetsPlugin({
      files: ['index.html'],
      assets: ['index.css'],
      append: true
    }),
    new modernizrWebpackPlugin(configMorenizr),
    new htmlWebpackIncludeAssetsPlugin({
      assets: ['modernizr-bundle.js'],
      append: false
    })
  ]
}