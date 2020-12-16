const globby = require('globby')
const paths = require('../utils/paths')

module.exports = async str => {
	const paths_source = await globby([ `${paths.getPath('../../src/components/**/*.js')}`])
	const paths_target = []

	paths_source.map(item =>
		paths_target.push(item.replace('src', '.').split('/').slice(-4).join('/'))
      )
      
	const items = paths_target.map(item => '<script src="' + item + '"></script>' + '\n')

	return str.replace(
		`
      <script id="component_scripts"></script>
`,
		`
      ${items.reduce((total, item) => (total += item), '')}
`
	)
}
