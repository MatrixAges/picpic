const fs = require('fs-extra')
const path = require('path')
const dree = require('dree')
const getImageinfo = require('imageinfo')
const config_preset = require('../../picpic.config.json')
const config_user = require(`${process.cwd()}/picpic.config.json`)

const config = Object.assign(config_preset, config_user)
const { types, depth } = config

async function getFileTree() {
	const path_target = path.resolve(process.cwd(), 'assets')
	const tree = await dree.scanAsync(path_target, {
		extensions: types,
		depth,
		symbolicLinks: false,
		sizeInBytes: false,
		hash: false,
		exclude: /.DS_Store/
	})

	const getImgDetail = (path, item) => {
		const data = fs.readFileSync(path)
		const { width, height } = getImageinfo(data)

		item.dimension = `${width}x${height}`
	}

	const removeUseless = (item) => {
		delete item.path
		delete item.stat
		delete item.sizeInBytes
		delete item.relativePath
		delete item.isSymbolicLink

		item.size = item.size.replace(/\s*/g, '')
	}

	const handleObject = (items) => {
		removeUseless(items)

		if (items.children) {
			items.children.map((item) => {
				let path

				if (item.type !== 'directory') {
					const array_path_source = item.relativePath.split('/')
					const start_index = array_path_source.findIndex((i) => i === 'assets')
					const array_path_target = array_path_source.slice(start_index - 2)

					path = `${array_path_target.join('/')}`

					getImgDetail(`assets/${array_path_target.join('/')}`, item)
				}
				removeUseless(item)

				handleObject(item)

				item.path = path
			})
		}
	}

	handleObject(tree)

	return tree
}

module.exports = {
	getFileTree: getFileTree,
	config: config
}
