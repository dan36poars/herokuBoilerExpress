import 'core-js/fn/promise';
import 'core-js/fn/array';
import 'core-js/es7/array';
// import 'jquery';
const jQry = require('jquery');
const $jq = jQry.noConflict();
import 'popper.js';
import 'bootstrap';
// import 'lodash';

import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.eot';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';
import '../../../node_modules/font-awesome/fonts/FontAwesome.otf';

import '../fonts/web.eot';
import '../fonts/web.svg';
import '../fonts/web.ttf';
import '../fonts/web.woff';

import '../scss/commons.scss';


// var toggleMenu = document.getElementById("toggleMenu");
// 	var menu = document.getElementById('Menu');
// 	toggleMenu.addEventListener('click', toggle );
// 	function toggle(e) {
// 		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
// 		} else {
// 			$jq('#Menu').slideToggle();		
// 		}
// 	}

// Carrousel
$jq('.carousel').carousel({
	interval: 3000
});

// popover
$jq(document).ready(
	function() {
		$jq('[data-toggle="popover"]').popover();
	}
);

// validation form
 $jq(document).ready(
 	function() {
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
 });