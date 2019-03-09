require('@babel/register');
const express = require('express');
const app = express();

const isDev = process.env.NODE_ENV === 'production';

if ( !isDev ) {
		const webpack = require('webpack');
		const configDevClient = require('../config/webpack.dev.js');	
		const compiler = webpack(configDevClient);

		const webpackDevMiddleware = require('webpack-dev-middleware')(
    	compiler,
    	configDevClient.devServer
 	 	);

 	 	const webpackHotMiddlware = require("webpack-hot-middleware")(
    	compiler,
    	configDevClient.devServer
  	);
  	
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);

 	const port = process.env.PORT || 8080;
  console.log('Middleware Enabled...');
  console.log('running express in http://localhost:' + port + ' in '+ process.env.NODE_ENV );

	app.use(express.static('dist'));

	app.get('/', function( req, res ){
		res.render('index');
	})

	app.listen(port , function(){
		console.log('running express in http://localhost:'+ port);
	});

} else {
	const port = process.env.PORT || 8080;
	app.use(express.static('dist'));

	app.get('/', function( req, res ){
		res.render('index');
	})

	app.listen(port , function(){
		console.log('running express in http://localhost:'+ port);
	});
}