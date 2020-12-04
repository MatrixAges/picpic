const fs = require('fs')
const globby = require('globby')

const main = async () => {
	const paths = await globby([ '*.png', '*.svg', '*.jpg', '*.jpeg' ])
	const html = fs.readFileSync('src/source.html').toString().replace(
		`
      <head>
            <title>MatirxAge images bed</title>
      </head>
`,
		`
      <head>
            <title>MatirxAge images bed</title>
            <script>
                  window.img_paths=${JSON.stringify(paths)}
            </script>
      </head>
`
      )
      
      if (!fs.existsSync('dist')) fs.mkdirSync('dist')
      
      fs.writeFileSync('dist/index.html', html)
}

main()
