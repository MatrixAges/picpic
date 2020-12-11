function formatFileSize (fileSize){
	if (fileSize < 1024) {
		return fileSize + 'B'
	} else if (fileSize < 1024 * 1024) {
		var temp = fileSize / 1024
		temp = temp.toFixed(2)
		return temp + 'KB'
	} else if (fileSize < 1024 * 1024 * 1024) {
		var temp = fileSize / (1024 * 1024)
		temp = temp.toFixed(2)
		return temp + 'MB'
	} else {
		var temp = fileSize / (1024 * 1024 * 1024)
		temp = temp.toFixed(2)
		return temp + 'GB'
	}
}

function getFileTree (array_imgs){
	const tree = {}

	array_imgs.map(item => {
		const struct = item.split('/')
		const length = struct.length
		const img = struct[length - 1]

		struct.map((it, idx) => {
			if (idx === 0) {
                        if (length-1>idx) {
                              
				}
				tree[it] = []

				return
			}

			if (idx === struct.length - 1) {
				return
			}
		})
	})
}

module.exports = {
	formatFileSize: formatFileSize
}
