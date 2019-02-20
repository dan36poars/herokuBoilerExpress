// file to remove the dist folder in this project

let subpath = __dirname
let obj = subpath.split('\\')
let len = obj.length
let newObj = obj.splice(0 , len - 1 )
let rootPath = newObj.join('\\')

// th path's that should be cleaned
const pathsToClean = [
  'dist'
]

// the clean options to use
const cleanOptions = {
  root:  rootPath,
  verbose: true,
  dry: false,
}


module.exports = {
	cleanOptions,
	pathsToClean
}