document.addEventListener('included', function (){
	new Vue({
		el: '#app',
		data: {
			img_paths: window.img_paths,
			current: -1,
			style: 'contain',
			page: 1,
			page_size: 10,
			array_page_size: [ 10, 20, 40, 80, 99999999 ],
			chunk_data: [],
			current_data: [],
			visible_nav: true,
			visible_msg: false,
			visible_search: false,
			timer_msg: 0,
			msg: '',
			search_text: '',
			header_no_border: false,
			autoplay: false,
			timer_autoplay: 0,
			is_mobile: false,
			mode: 'block'
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
			current: function (new_val){
				this.$nextTick(() => {
					const detail_wrap = document.querySelector('#detail_wrap')

					if (new_val !== -1) {
						detail_wrap.addEventListener(
							'mousewheel',
							function (e){
								e.preventDefault()
							},
							false
						)

						detail_wrap.addEventListener(
							'touchmove',
							function (e){
								e.preventDefault()
							},
							false
						)
					} else {
						detail_wrap.removeEventListener(
							'mousewheel',
							function (e){
								e.preventDefault()
							},
							false
						)

						detail_wrap.removeEventListener(
							'touchmove',
							function (e){
								e.preventDefault()
							},
							false
						)
					}
				})
			},
			page: function (new_val){
				this.current_data = this.chunk_data[new_val - 1]
			},
			page_size: function (new_val){
				this.chunk_data = _.chunk(this.img_paths, new_val)
				this.current_data = this.chunk_data[0]
				this.page = 1

				localStorage.setItem('page_size', Number(new_val))
			},
			search_text: _.throttle(
				function (new_val){
					if (!new_val) {
						this.visible_nav = true
						this.chunk_data = _.chunk(this.img_paths, this.page_size)
						this.current_data = this.chunk_data[this.page - 1]
						return
					}

					this.visible_nav = false

					function fuzzyQuery (list, keyWord){
						var arr = []

						for (var i = 0; i < list.length; i++) {
							if (list[i].name.indexOf(keyWord) >= 0) {
								arr.push(list[i])
							}
						}

						return arr
					}

					this.current_data = fuzzyQuery(this.img_paths, new_val)
				},
				360,
				{ leading: false }
			)
		},
		mounted: function (){
			this.getDeviceInfo()
			this.setLanding()
			this.setChunkData()
			this.getLocalStorage()

			window.addEventListener('scroll', this.handleScroll)
		},
		destroyed () {
			document.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			getDeviceInfo () {
				if (document.body.offsetWidth <= 800) {
					this.is_mobile = true
				} else {
					this.is_mobile = false
				}
			},
			handleScroll () {
				const scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop
				const top = this.is_mobile ? 0 : this.$refs.img_items.offsetTop

				if (scrollTop > top) {
					this.header_no_border = true
				} else {
					this.header_no_border = false
				}
			},
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
			getLocalStorage: function (){
				const page_size = localStorage.getItem('page_size')
				const style = localStorage.getItem('style')
                        const mode = localStorage.getItem('mode')

				if (page_size) this.page_size = page_size
				if (style) this.style = style
				if (mode) this.mode = mode
			},
			onImgItem: function (e){
				const type = e.target.dataset.type
				const index = Number(e.target.dataset.index)

				if (!type) {
					this.current = -1
					this.autoplay = false

					clearInterval(this.timer_autoplay)

					return
				}

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
						}, 1200)

						clipboardCopy(
							'https://' +
								location.host +
								'/images/' +
								this.current_data[index].name
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

				localStorage.setItem('style', style)
			},
			onToggleAutoPlay: function (){
				this.autoplay = !this.autoplay

				if (this.autoplay) {
					this.timer_autoplay = setInterval(() => {
						const target_next = this.current + 1

						if (target_next < this.current_data.length) {
							this.current = target_next
						} else {
							this.autoplay = false
							clearInterval(this.timer_autoplay)
						}
					}, 2400)
				} else {
					clearInterval(this.timer_autoplay)
				}
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

						if (target_next < this.current_data.length)
							this.current = target_next

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
			},
			onToggleSearch () {
				this.visible_search = !this.visible_search
				this.search_text = ''
			},
			onToggleMode () {
				localStorage.setItem('mode', this.mode === 'block' ? 'list' : 'block')

				if (this.mode === 'block') return (this.mode = 'list')
				if (this.mode === 'list') return (this.mode = 'block')
			}
		}
	})
})
