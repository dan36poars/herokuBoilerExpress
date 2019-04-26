const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const modernizrWebpackPlugin = require('modernizr-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const configMorenizr = require('./modernizr.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: ['webpack-hot-middleware/client?reload=true','./src/build/js/index.bundle'],
    contato: ['webpack-hot-middleware/client?reload=true', './src/build/js/contato.bundle'],
  },
  mode:"development",
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization:{
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 5,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'commons'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,        
          chunks: "initial",
          priority: 10,
          enforce: true,
          name: 'vendors'
        }        
      }
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    overlay: true,
    hot: true,
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
            loader: 'style-loader'
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
          },
          {
            loader: 'sass-loader'
            
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }           
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].[ext]'
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
      template: './src/build/pug/index.pug',
      chunks: ['index', 'vendors']
    }),
    new htmlWebpackPlugin({
      filename: 'contact.html',
      template:  './src/build/pug/contact.pug',
      chunks: ['contato', 'vendors']
    }), 
    new htmlWebpackIncludeAssetsPlugin({
      files: ['index.html'],
      assets: ['css/font-awesome.css'],
      append: true
    }),
    new htmlWebpackIncludeAssetsPlugin({
      files: ['contact.html'],
      assets: [],
      append: true
    }),
    new modernizrWebpackPlugin(configMorenizr),
    new htmlWebpackIncludeAssetsPlugin({
      assets: ['modernizr-bundle.js'],
      append: false
    })
    // new BundleAnalyzerPlugin({
    //  generateStatsFile: true
    // })
  ]
}