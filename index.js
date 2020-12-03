new Vue({
	el: '#app',
	data: {
		img_paths: window.img_paths
	},
	filters: {
		getStyles: function (path){
			var str = ''

			str += ';background-image:url(./' + path + ')'
			str += ';background-size:108% 108%'
			str += ';background-position:center center'

			return str
		}
	}
})
