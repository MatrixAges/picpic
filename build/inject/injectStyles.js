const globby = require('globby')

module.exports = async str => {
      const paths_source = await globby(['src/components/**/*.css'])
      const paths_target = []

      paths_source.map(item => paths_target.push(item.replace('src', '.')))

      const items = paths_target.map(item => '@import ' + "'" + item + "'" + ';' + '\n')

      return str.replace(
            `
      <style></style>
`,
            `
      <style>
            ${items.reduce((total, item) => total += item, '')}
      </style>
`
      )
}