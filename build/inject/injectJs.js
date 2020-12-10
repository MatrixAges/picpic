const globby = require('globby')

module.exports = async str => {
      const paths_source = await globby(['src/components/**/*.js'])
      const paths_target = []

      paths_source.map(item => paths_target.push(item.replace('src', '.')))

      const items = paths_target.map(item => '<script src="' + item + '"></script>' + '\n')

      return str.replace(
            `
      <script id="component_scripts"></script>
`,
            `
      ${items.reduce((total, item) => total += item, '')}
`
      )
}