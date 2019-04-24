import './common';
import '../scss/index.scss';
var d3 = require('d3');
var utility2 = require('./utility2');

let A = [ 1, 3, 5 , 76, 47 ];
let B = [ 3 , 4 ];

A.forEach( function (element) {
  if ( B.includes( element ) ) {
    console.log( element );
  }
});

