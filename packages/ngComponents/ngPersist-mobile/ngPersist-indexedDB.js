// (function () {
	
// 	'use strict';

	async function createIndexedDB(cacheName, filesToCache) {
		indexedDB.open(cacheName, 1, (updateCacheDB) => {
			var storeAppShell = updateCacheDB.createObjectStore(cacheName, { autoIncrement: true })
			filesToCache.split(',').map((item) => { storeAppShell.add(item) })
		})
	}

	async function retrieveIndexedDB(cacheName, key) {
		var onSuccess = (storeIndexedDB, metadataObjectStore, promise) => {
	 		var getRequest = (metadataObjectStore.hasObjectStore ? storeIndexedDB.get(metadataObjectStore.queryString) : storeIndexedDB.getAll())
			 		
		 	getRequest.onsuccess = (event) => {
		 		var getResult = (Array.isArray(getRequest.result) ? getRequest.result : new Array(getRequest.result))

		 		// FIX BUG: Reduce fails to array length = 0
		 		var Init = getResult.map((item) => { return item.Init }).reduce((item) => { return item })
		 		var Body = (Init.contentType.search('json') != -1
		 				    ? (metadataObjectStore.hasObjectStore ? JSON.stringify(getResult[0].Body) : JSON.stringify(getResult.map((item) => { return item.Body })))
		 					: getResult.map((item) => { return item.Body }).reduce((item) => { return item }))

		 		promise.resolve(new Response(Body, Init))
		 	}

		 	getRequest.onerror = (event) => {
		 		promise.reject(Error('ObjectStore Not Found! Url: ' + metadataObjectStore.url))	
		 	}
		}

		var firstIndexedDB = await getIndexedDB(cacheName).then((result) => { return result })
		
		// FIX BUG: Can I retrieve Null from catch error?
	    return await withStore(firstIndexedDB, "readonly", key, onSuccess).then((result) => {
	    	return result
	    }).catch((error) => {
	    	console.log(error)
	    }).finally(() => { 
	    	firstIndexedDB.close()
	    })
	}

	async function updateIndexedDB(cacheName, key, value) {
		var responseObjectStore = createResponseObjectStore(key, value.clone())
		
		var onUpgradeNeeded = (secondIndexedDB, key, responseObjectStore, promise) => {
			console.log('Into onUpgradeNeeded')

			var metadataObjectStore = (responseObjectStore.Init.contentType.search('json') != -1 
										? existSubObjectStore(secondIndexedDB, key) 
										: { url: key, queryString: '', hasObjectStore: false })
					
			if (!metadataObjectStore.hasObjectStore) {
				var storeIndexedDB = secondIndexedDB.createObjectStore(metadataObjectStore.url, { keyPath: "_ID", autoIncrement:true })

				if (responseObjectStore.Init.contentType.search('json') != -1) {
					responseObjectStoreJsonArray(responseObjectStore).map((item) => { storeIndexedDB.put(item) })
				} else {
					storeIndexedDB.put(responseObjectStore)
				}
			 }
		}

		var firstIndexedDB = await getIndexedDB(cacheName).then((result) => { return result })

		await setIndexedDB(firstIndexedDB, key, responseObjectStore, onUpgradeNeeded).then((result) => {
	    	console.log(result)
	    }).catch((error) => {
	    	console.log(error)
	    }).finally(() => { 
	    	console.log('finally')
	    })

		return value
	}

	async function deleteIndexedDB(cacheName) {
		return indexedDB.deleteDatabase(cacheName)
	}

	async function getIndexedDB(databaseName) {
	    return new Promise((resolve, reject) => {
			var firstRequest = indexedDB.open(databaseName)

			firstRequest.onerror = (event) => {
				reject(Error('Você não habilitou minha web app para usar IndexedDB?!' + event.target.error))
			}

			firstRequest.onsuccess = (event) => {
				resolve(firstRequest.result)
			}
		})
	}


	async function setIndexedDB(firstIndexedDB, key, value, callback) {
		return new Promise((resolve, reject) => {

			var databaseVersion = parseInt(firstIndexedDB.version)
			var databaseName = firstIndexedDB.name
			var hasObjectStore = firstIndexedDB.objectStoreNames.contains(key)

			firstIndexedDB.close()

			if (!hasObjectStore) {

				var secondRequest = indexedDB.open(databaseName, databaseVersion + 1)
				var promise = { resolve, reject }

				secondRequest.onerror = (event) => {
					reject(Error('Você não habilitou minha web app para usar IndexedDB?!' + event.target.error))
				}

				secondRequest.onupgradeneeded = (event) => {
					var secondIndexedDB = secondRequest.result
					callback(secondIndexedDB, key, value, promise)
				}

				secondRequest.onsuccess = (event) => {
					var secondIndexedDB = secondRequest.result
					secondIndexedDB.close()

					resolve(value)
				}
			} else {
			 	reject(Error('indexedDB Store already created: ' + key))
			}

		})
	}

	async function withStore(indexedDB, type, key, callback) {
		return new Promise((resolve, reject) => {
			var metadataObjectStore = existSubObjectStore(indexedDB, key)

			var transactionIndexedDB = indexedDB.transaction(metadataObjectStore.url, type)
		 	var storeIndexedDB = transactionIndexedDB.objectStore(metadataObjectStore.url)
		 	var promise = { resolve, reject }

			indexedDB.onerror = (event) => {
	   			reject(Error('indexedDB.onerror: ' + event.target.error))
			}

			transactionIndexedDB.onerror = (event) =>  { 
		 		reject(Error('transactionIndexedDB.onerror: ' + event.target.error))
		 	}

		 	transactionIndexedDB.oncomplete = () =>  { 
		 		
		 	}
			
		 	storeIndexedDB.onerror = (event) => {
	   			reject(Error('storeIndexedDB.onerror: ' + event.target.error))
		 	}

	 		callback(storeIndexedDB, metadataObjectStore, promise)
	 	})
	}

	function responseObjectStoreJsonArray(responseObjectStore) {
		var arrayResponseObjectStore = []

		if (Array.isArray(responseObjectStore.Body)) {
			responseObjectStore.Body.map((item) => { arrayResponseObjectStore.push(createResponseObjectStoreJson(responseObjectStore, item)) })
		} else {
			arrayResponseObjectStore.push(createResponseObjectStoreJson(responseObjectStore, responseObjectStore.Body))
		}

		return arrayResponseObjectStore
	}

	function createResponseObjectStore(key, responseClone) {
		var responseObjectStore = { _ID: key, Body: {}, 
									Init: 	{ 	bodyUsed: responseClone.bodyUsed,
												headers: {},
												ok: responseClone.ok,
												redirected: responseClone.redirected,
												status: responseClone.status,
												statusText: responseClone.statusText,
												type: responseClone.type,
												url: responseClone.url,
												contentType: ''
											} 
								  }

		responseClone.headers.forEach((value, key) => {  responseObjectStore.Init.headers[key] = value })
		responseObjectStore.Init.contentType = responseObjectStore.Init.headers["content-type"]

		if ((responseObjectStore.Init.contentType.search('text') != -1) || (responseObjectStore.Init.contentType.search('script') != -1)) {
		 	responseClone.text().then(function(result) { responseObjectStore.Body = result })
		} else if (responseObjectStore.Init.contentType.search('json') != -1) {
			responseClone.json().then(function(result) { responseObjectStore.Body = result })
		} else {
		 	responseClone.blob().then(function(result) { responseObjectStore.Body = result })
		}

		return responseObjectStore
	}

	function createResponseObjectStoreJson(responseObjectStore, objectJSON) {
		var responseObjectStoreJson = JSON.parse(JSON.stringify(responseObjectStore))

		responseObjectStoreJson._ID = (objectJSON.hasOwnProperty('id') ? objectJSON.id : 
									  (objectJSON.hasOwnProperty('ID') ? objectJSON.ID : 
									  (objectJSON.hasOwnProperty('_id') ? objectJSON._id :
									  (objectJSON.hasOwnProperty('_ID') ? objectJSON._ID :
									  Object.keys(objectJSON)[0]
									  ))))
		responseObjectStoreJson.Body = objectJSON

		return responseObjectStoreJson
	}

	function existSubObjectStore(indexedDB, key) {
		var metadataObjectStore = { url: key, queryString: '', hasObjectStore: false }

		var arrayUrl = key.split('/')
		var subUrl = arrayUrl.slice(0, (arrayUrl.length - 1)).reduce((total, item) => { return total.concat('/', item) })

		if (indexedDB.objectStoreNames.contains(subUrl)) {
			metadataObjectStore.url = subUrl
			metadataObjectStore.queryString = arrayUrl.slice((arrayUrl.length - 1))[0]
			metadataObjectStore.hasObjectStore = true
		}

		return metadataObjectStore
	}

//})();