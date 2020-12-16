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
			select_folder: [],
			current_folder: {},
			folder_prev: '',
			folder_use: 'assets',
			img_data: [],
			chunk_data: [],
			current_data: [],
			visible_nav: true,
			visible_msg: false,
			visible_search: false,
			visible_folder_select: false,
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
			page: function (new_val){
				this.current_data = this.chunk_data[new_val - 1]
			},
			page_size: function (new_val){
				this.chunk_data = lodash_chunk(this.img_data, new_val)
				this.current_data = this.chunk_data[0]
				this.page = 1

				localStorage.setItem('page_size', Number(new_val))
			},
			search_text: lodash_throttle(
				function (new_val){
					if (!new_val) {
						this.visible_nav = true
						this.chunk_data = lodash_chunk(this.img_data, this.page_size)
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

					this.current_data = fuzzyQuery(this.img_data, new_val)
				},
				360,
				{ leading: false }
			),
			current_folder: function (new_val){
				const current = new_val.name
				const index = this.select_folder.findIndex(item => item === current)

				this.folder_prev = this.select_folder[index - 1]
			}
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
			preventScroll (event) {
				event.preventDefault()
			},
			getDeviceInfo: function (){
				if (document.body.offsetWidth <= 800) {
					this.is_mobile = true
				} else {
					this.is_mobile = false
				}
			},
			handleScroll: function (){
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
			getImgs: function (children, arr){
				children.map(item => {
					if (item.type === 'file') {
						arr.push(item)
					} else {
						if (item.children) {
							this.getImgs(item.children, arr)
						}
					}
				})
			},
			setChunkData: function (){
				this.select_folder = [ 'assets' ]
				this.current_folder = this.img_paths

				const arr = []

				this.getImgs(this.img_paths.children, arr)

				this.img_data = arr
				this.chunk_data = lodash_chunk(this.img_data, this.page_size)
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
				const _that = this
				const type = e.target.dataset.type
				const path = e.target.dataset.path
				const index = Number(e.target.dataset.index)

				if (!type) {
					this.current = -1
					this.autoplay = false

					clearInterval(this.timer_autoplay)

					return
				}

				function showMsg (){
					_that.msg = 'link has copy to clipboard'
					_that.visible_msg = true

					clearTimeout(_that.timer_msg)

					_that.timer_msg = setTimeout(() => {
						_that.visible_msg = false
					}, 1200)
				}

				switch (type) {
					case 'img':
						this.current = index

						break
					case 'url':
						showMsg()

						clipboardCopy(
							'https://' +
								location.host +
								location.pathname +
								this.current_data[index].path
						)
						break
					case 'path':
						showMsg()

						clipboardCopy(
							'https://' + location.host + location.pathname + path
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
			onToggleSearch: function (){
				this.visible_search = !this.visible_search
				this.search_text = ''
			},
			onToggleFolder: function (){
				this.visible_folder_select = !this.visible_folder_select
			},
			onToggleMode: function (){
				localStorage.setItem('mode', this.mode === 'block' ? 'list' : 'block')

				if (this.mode === 'block') return (this.mode = 'list')
				if (this.mode === 'list') return (this.mode = 'block')
			},
			onFolder: function (e){
				const name = e.target.dataset.name
				const item = this.current_folder.children.find(item => item.name === name)

				this.select_folder.push(name)
				this.current_folder = item
			},
			onPrevFolder: function (){
				const _that = this
				const folder_prev = _that.folder_prev

				_that.select_folder.pop()

				function findPrev (children, item){
					const target = children.find(it => {
						if (it.type === 'directory') {
							return it.name === item
						}
					})

					if (target.name === folder_prev) {
						_that.current_folder = target

						return true
					} else {
						findPrev(target.children)
					}
				}

				if (_that.folder_prev === 'assets') {
					_that.current_folder = _that.img_paths
				} else {
					for (const i in _that.select_folder) {
						if (Number(i) !== 0) {
							const target = findPrev(
								_that.img_paths.children,
								_that.select_folder[i]
							)

							if (target) return
						}
					}
				}
			},
			toggleFolderUse: function (){
				let source_data
				const arr = []

				if (this.folder_use === this.current_folder.name) {
					source_data = this.img_paths.children

					this.folder_use = 'assets'
				} else {
					source_data = this.current_folder.children

					this.folder_use = this.current_folder.name
				}

				this.getImgs(source_data, arr)

				this.img_data = arr
				this.chunk_data = lodash_chunk(this.img_data, this.page_size)
				this.current_data = this.chunk_data[this.page - 1]
			}
		}
	})
})
