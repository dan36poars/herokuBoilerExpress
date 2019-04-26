import './common';
import '../scss/index.scss';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.eot';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';
import '../../../node_modules/font-awesome/fonts/FontAwesome.otf';
const $ = require('jquery');
var utility2 = require('./utility2');

 $('.carousel').carousel({
 	interval: 10000
 });

// popover
 $(function() {
 	$('[data-toggle="popover"]').popover();
 });

// validation form
 $(function() {
 		window.addEventListener('load', function () {
 		var forms = document.getElementsByClassName('needs-validation');
 		var validation = Array.prototype.filter.call( forms, function (form) {
 			form.addEventListener('submit', function (event) {
 				if (form.checkValidity() === false) {
 					event.preventDefault();
 					event.stopPropagation();
 				}
 				form.classList.add('was-validated');
 			}, false);
 		});
 	}, false);
 })();

