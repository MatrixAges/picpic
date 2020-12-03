console.log(window);

new Vue({
	el: '#app',
	data: {
		img_paths: window.img_paths,
		current: -1,
		style: 'cover'
	},
	filters: {
		getStyles: function (path){
			var str = ''

			str += ';background-image:url(../' + path + ')'
			str += ';background-size:cover'
			str += ';background-position:center center'
			str += ';background-repeat:no-repeat'

			return str
		}
	},
	methods: {
		onImgItem: function (e){
			const type = e.target.dataset.type
			const index = e.target.dataset.index

			this.style = 'cover'

			if (!type) return (this.current = -1)

			switch (type) {
				case 'img':
					this.current = index
					break
				case 'url':
					clipboardCopy('https://matrixage.github.io/images/'+this.img_paths[index])
					break
				default:
					break
			}
		},
		onChooseStyle: function (e){
			const style = e.target.dataset.style

			if (!style) return

			this.style = style
		}
	}
})
