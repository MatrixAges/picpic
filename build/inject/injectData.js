const fs = require('fs-extra')
const globby = require('globby')
const getImageinfo = require('imageinfo')
const { formatFileSize } = require('../utils')
const config = require('../../picpic.config.json')
const { types } = config

module.exports = async str => {
	const paths_types = types.reduce((total, item) => {
		total.push(`assets/**/*.${item}`)

		return total
	}, [])

	const paths_source_img = await globby(paths_types)
      const paths_target_img = []

      console.log(paths_source_img);

	paths_source_img.map(item => {
		const data = fs.readFileSync(item)
		const { format, width, height } = getImageinfo(data)

		paths_target_img.push({
			name: item.substr(7),
			weight: formatFileSize(data.length),
			size: `${width}x${height}`,
			format
		})
      })

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
