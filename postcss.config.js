module.exports = {
	plugins: [
		require('autoprefixer')({
			browsers: ['last 2 version','> 1%', 'IE 10'],
			grid: true
		})
	]
}