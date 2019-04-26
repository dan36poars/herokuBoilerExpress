const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const babelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const compressionWebackPlugin = require('compression-webpack-plugin');
const brotliWebpackplugin = require('brotli-webpack-plugin');


module.exports = {
  entry: {
    index: ['./src/build/js/index.bundle.js'],
    contato: ['./src/build/js/contato.bundle.js'],
  },
  mode: 'production',
  output: {
    filename: 'assets/js/[name]-bundle.js',
    path: path.resolve( __dirname, '../dist'),
    sourceMapFilename: '[file].map',
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
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'file-loader?name=assets/css/[name].css'
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {              
              name: 'assets/fonts/[name].[ext]'
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
              name: 'assets/css/[name].[ext]'
            }
          }
        ]
      }  
    ]
  },
  plugins: [
    new cleanWebpackPlugin({
          root:  process.cwd(),
          verbose: false,
          dry: false
        }
    ),
    new htmlWebpackPlugin({
      filename:  'index.html',
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
      assets: [
        'assets/css/index.css',
        'assets/css/font-awesome.css'
      ],
      append: true
    }),
    new htmlWebpackIncludeAssetsPlugin({
      files: ['contact.html'],
      assets: [
        'assets/css/contact.css'             
      ],
      append: true
    }),
    new miniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: '[id].css' 
    }),
    new optimizeCssAssetsWebpackPlugin(),
    // new babelMinifyWebpackPlugin()
    new uglifyJsWebpackPlugin(),
    new brotliWebpackplugin(),
    new compressionWebackPlugin({
      algorithm: 'gzip'
    })
  ]
};