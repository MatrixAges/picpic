const fs = require('fs-extra')
const globby = require('globby')
const config = require('../picpic.config.json')

const { types, useFolder } = config

const main = async () => {
	const paths_types = types.reduce((total, item) => {
		total.push(`assets/*.${item}`)

		return total
	}, [])

	const paths_source = await globby(paths_types)
	const paths_target = []

	paths_source.map(item => paths_target.push(item.substr(7)))

	const html = fs.readFileSync('src/source.html').toString().replace(
		`
      <head>
            <title>PicPic</title>
      </head>
`,
		`
      <head>
            <title>PicPic</title>
            <script>
                  window.img_paths=${JSON.stringify(paths_target)}
            </script>
      </head>
`
	)

	if (!fs.existsSync('dist')) {
		fs.mkdirSync('dist')
	} else {
		fs.removeSync('dist')
		fs.mkdirSync('dist')
	}

	fs.writeFileSync('dist/index.html', html)
	fs.copySync('assets', 'dist')
      fs.copySync('src', 'dist')
	fs.removeSync('dist/styles/index.less')
	fs.removeSync('dist/source.html')
}

main()
