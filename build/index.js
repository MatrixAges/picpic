const fs = require('fs-extra')
const globby = require('globby')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminWebp = require('imagemin-webp')
const inject = require('./inject')
const paths = require('./utils/paths')
const { config } = require('./utils/index')

const { compress } = config

const compressImages = async () => {
	let files

	if (compress.webp) {
		files = await imagemin([`${paths.assets}/**/*.{jpg,png,gif,webp}`], {
			plugins: [
				imageminGifsicle({ optimizationLevel: compress.quality * 3 }),
				imageminWebp({ quality: compress.quality * 100 })
			]
		})
	} else {
		files = await imagemin([`${paths.assets}/**/*.{jpg,png,gif}`], {
			plugins: [
				imageminMozjpeg({ quality: compress.quality * 100 }),
				imageminPngquant({ quality: [compress.quality, compress.quality] }),
				imageminGifsicle({ optimizationLevel: compress.quality * 3 })
			]
		})
	}

	files.map((item) => {
		fs.writeFileSync(item.sourcePath.replace('assets', 'dist'), item.data)
	})
}

const main = async () => {
	if (!fs.existsSync(paths.dist)) {
		fs.mkdirSync(paths.dist)
	} else {
		fs.removeSync(paths.dist)
		fs.mkdirSync(paths.dist)
	}

	fs.copySync(paths.assets, paths.dist)

	if (compress && compress.quality) compressImages()

	fs.writeFileSync(`${paths.dist}/index.html`, await inject())
	fs.copySync(paths.getPath('../../src'), paths.dist)
	fs.removeSync(`${paths.dist}/source.html`)

	const less = await globby(`${paths.dist}/**/*.less`)

	less.map((item) => fs.removeSync(item))

	console.log('---------- picpic build success! ---------- \n')
}

try {
	main()
} catch (error) {
	console.log('---------- picpic build error! ---------- \n')
	console.error(error)
}
