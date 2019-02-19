require('./build/js/app.js');
require('./build/scss/main.scss');

if (module.hot) {
  	module.hot.accept('./build/js/app.js', () => {
		console.log('Accepting the updated printMe module!')
  })
}