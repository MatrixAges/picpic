new Vue({
	el: '#app',
	data: {
		img_paths: window.img_paths,
		current: -1,
		style: 'contain',
		page: 1,
		page_size: 10,
		array_page_size: [ 10, 20, 40, 80 ],
		chunk_data: [],
		current_data: [],
		visible_msg: false,
		timer_msg: 0,
		msg: '',
		search_text: ''
	},
	filters: {
		getStyles: function (path){
			var str = ''

			str += ';background-image:url(./' + path + ')'
			str += ';background-size:cover'
			str += ';background-position:center center'
			str += ';background-repeat:no-repeat'

			return str
		}
	},
	watch: {
		page: function (new_val){
			this.current_data = this.chunk_data[new_val - 1]
		},
		page_size: function (new_val){
			this.chunk_data = _.chunk(this.img_paths, new_val)
			this.current_data = this.chunk_data[0]
			this.page = 1
            },
            search_text: function (new_val) {
                  
            }
	},
	mounted: function (){
		this.setLanding()
		this.setChunkData()
	},
	methods: {
		setLanding: function (){
			setTimeout(() => {
				const landing_wrap = document.querySelector('#landing_wrap')
				const app = document.querySelector('#app')

				landing_wrap.style.opacity = 0

				setTimeout(() => (landing_wrap.style.display = 'none'), 300)

				app.style.opacity = 1
			}, 300)
		},
		setChunkData: function (){
			this.chunk_data = _.chunk(this.img_paths, this.page_size)
			this.current_data = this.chunk_data[this.page - 1]
		},
		onImgItem: function (e){
			const type = e.target.dataset.type
			const index = Number(e.target.dataset.index)

			this.style = 'contain'

			if (!type) return (this.current = -1)

			switch (type) {
				case 'img':
					this.current = index
					break
				case 'url':
					this.msg = 'link has copy to clipboard'
					this.visible_msg = true

					clearTimeout(this.timer_msg)

					this.timer_msg = setTimeout(() => {
						this.visible_msg = false
                              }, 900)
                              
                              console.log(location.host);

					clipboardCopy(
						'https://'+location.host+'/images/' + this.current_data[index]
					)
					break
				default:
					break
			}
		},
		onChooseStyle: function (e){
			const style = e.target.dataset.style

			if (!style) return

			this.style = style
		},
		onChangeCurrent: function (e){
			const type = e.target.dataset.type

			if (!type) return

			switch (type) {
				case 'prev':
					const target_prev = this.current - 1

					if (target_prev >= 0) this.current = target_prev

					break
				case 'next':
					const target_next = this.current + 1

					if (target_next < this.current_data.length) this.current = target_next

					break
				default:
					break
			}
		},
		onPageItem: function (e){
			const page = e.target.dataset.page

			if (!page) return

			this.page = Number(page)
		},
		onPrev: function (){
			const target_prev = this.page - 1

			if (target_prev > 0) this.page = target_prev
		},
		onNext: function (){
			const target_next = this.page + 1

			if (target_next <= this.chunk_data.length) this.page = target_next
		},
		onEnterPage: function (e){
			if (e.keyCode !== 13) return

			const value = this.$refs.input_page.value

			if (value <= 0 || value > this.chunk_data.length) return

			this.page = value
		}
	}
})
