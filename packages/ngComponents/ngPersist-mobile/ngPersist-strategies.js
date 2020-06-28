// (function () {
  
//   'use strict';

	function getNgPersist() {
		return {
			Config: { 
						appDataName: '',
						staticTypes: [],
						dynamicTypes: [],
						ignoreUrls: []
					},
			Run: ngPersist_Run
		}
	}


	function ngPersist_Run(request, ngPersistConfig) {
		if (ngPersistConfig.staticTypes.includes(request.destination)) {
			return offlineFirst(request, ngPersistConfig)
		} else {
	    	return onlineFirst(request, ngPersistConfig)
		}
	}

	function offlineFirst(request, ngPersistConfig) {
		console.log('/* Strategy Cache First */')

		return retrieveOfflineData(request.url, ngPersistConfig).then((response) => {
			return response
		}).catch((error) => {
			return fetch(request).then((response) => { 
				//if (ngPersistConfig.ignoreUrls.some((item) => { return url.includes(item) }) == true) {
					//return response
				//} else {
					return updateOfflineData(request.url, response, ngPersistConfig).then((response) => { return response })
				//}
			})
		})
	}

	function onlineFirst(request, ngPersistConfig) {
		console.log('/* Strategy Network First */')

		return fetch(request).then((response) => {
	   		if (!response || response.status !== 200) {
	   			return retrieveOfflineData(request.url, ngPersistConfig).then((response) => { return response })
	   		} else {
	      		return updateOfflineData(request.url, response, ngPersistConfig).then((response) => { return response })
	      	} 
	    }).catch((error) => {
			return retrieveOfflineData(request.url, ngPersistConfig).then((response) => { return response })
		})
	}

//})();