const fs = require('fs-extra')
const globby = require('globby')
const inject = require('./inject')
const paths = require('./utils/paths')

const main = async () => {
	if (!fs.existsSync(paths.dist)) {
		fs.mkdirSync(paths.dist)
	} else {
		fs.removeSync(paths.dist)
		fs.mkdirSync(paths.dist)
	}

	fs.writeFileSync(`${paths.dist}/index.html`, await inject())
	fs.copySync(paths.assets, paths.dist)
	fs.copySync(paths.getPath('../src'), paths.dist)
	fs.removeSync(`${paths.dist}/source.html`)

	const less = await globby(`${paths.dist}/**/*.less`)

	less.map(item => fs.removeSync(item))
}

try {
	main()

	console.log('---------- picpic build success! ---------- \n')
} catch (error) {
	console.log('---------- picpic build error! ---------- \n')
	console.error(error)
}
