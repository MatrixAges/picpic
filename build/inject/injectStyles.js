const globby = require('globby')
const paths = require('../utils/paths')

module.exports = async str => {
	const paths_source = await globby([ `${paths.getPath('../../src/components/**/*.css')}` ])
	const paths_target = []

	paths_source.map(item =>
		paths_target.push(item.replace('src', '.').split('/').slice(-4).join('/'))
      )

	const items = paths_target.map(item => '@import ' + "'" + item + "'" + ';' + '\n')

	return str.replace(
		`
      <style></style>
`,
		`
      <style>
            ${items.reduce((total, item) => (total += item), '')}
      </style>
`
	)
}
