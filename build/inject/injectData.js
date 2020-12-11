const { getFileTree } = require('../utils')

module.exports = async str => {
	const tree = await getFileTree()

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
                  window.img_paths=${JSON.stringify(tree)}
            </script>
      </head>
`
	)
}
