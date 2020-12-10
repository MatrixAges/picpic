const fs = require('fs-extra')
const inject = require('./inject')

const main = async () => {
	if (!fs.existsSync('dist')) {
		fs.mkdirSync('dist')
	} else {
		fs.removeSync('dist')
		fs.mkdirSync('dist')
	}

	fs.writeFileSync('dist/index.html', await inject())
	fs.copySync('assets', 'dist')
	fs.copySync('src', 'dist')
	fs.removeSync('dist/styles/index.less')
	fs.removeSync('dist/source.html')
}

main()
