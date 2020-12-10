const globby = require('globby')
const config = require('../../picpic.config.json')
const { types } = config

module.exports = async str => {
	const paths_types = types.reduce((total, item) => {
		total.push(`assets/*.${item}`)

		return total
	}, [])

	const paths_source_img = await globby(paths_types)
	const paths_target_img = []

	paths_source_img.map(item => paths_target_img.push(item.substr(7)))

	return str.replace(
		`
      <head>
            <title>PicPic</title>
      </head>
`,
		`
      <head>
            <title>PicPic</title>
            <script>
                  window.img_paths=${JSON.stringify(paths_target_img)}
            </script>
      </head>
`
	)
}
