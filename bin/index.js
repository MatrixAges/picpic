#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const child_process = require('child_process')
const pkg = require(`${process.cwd()}/package.json`)

const main = () => {
	const args = process.argv[2]
	const root = process.cwd()
	const getPath = p => path.join(__dirname, p)

	switch (args) {
		case 'init':
			pkg['scripts']['build'] = 'picpic build'

			fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2).concat('\n'))
			fs.mkdirSync(`${root}/.github`)
			fs.copySync(getPath('../.github'), `${root}/.github`)

			console.log('picpic init success! \n')
			break
		case 'build':
			child_process.execSync(`node ../build/index.js`)
			break
		default:
			break
	}
}

main()
