(function() {

	'use strict';

	angular.module('ngComponents').factory('mobileNgDownload', [mobileNgDownload])

	function mobileNgDownload() {
		
		function downloadURL (values, name, type) {
			let downloadLink = document.createElement('a')
			downloadLink.href = values
			downloadLink.target = '_blank'
			downloadLink.download = name
			downloadLink.click()
		  }
  
		  function downloadBlob (values, name, type) {
			  var blob = new Blob([values], { type: type })
			  var url = URL.createObjectURL(blob)
			  _downloadURL(url, name, type)
			  URL.revokeObjectURL(blob)
		  }

		return { downloadURL, downloadBlob }

	}

})();