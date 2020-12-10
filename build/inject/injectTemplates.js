const globby = require('globby')

module.exports = async str => {
      const paths_source = await globby(['src/components/**/*.html'])
      const paths_target = []

      paths_source.map(item => paths_target.push(item.replace('src', '.')))
      
      const items = paths_target.map(item => '<include src="' + item + '"></include>' + '\n')

      return str.replace(
            `
                  <template-slot></template-slot>
`,
            `
                  ${items.reduce((total, item) => total += item, '')}
`
      )
}