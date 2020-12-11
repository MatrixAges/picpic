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

module.exports = {
	formatFileSize: formatFileSize
}
