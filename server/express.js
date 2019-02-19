const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
app.use(express.static('dist'));

app.get('/', function( req, res ){
	res.render('index');
})

app.listen(port , function(){
	console.log('running express in http://localhost:'+ port);
});