const path = require('path')
const root = process.cwd()

module.exports = {
	root: root,
	dist: `${root}/dist`,
	assets: `${root}/assets`,
	getPath: p => path.join(__dirname,'../', p)
}
