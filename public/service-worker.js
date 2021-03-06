(function () {
	// 1617115194239
	
 	'use strict';

	self.importScripts('./shared/behaviors/deps.persist.js')
	
	var ngPersist = getNgPersist()
	ngPersist.Config.appDataName = 'appData_AppTemplate'
	ngPersist.Config.staticTypes = ['document', 'manifest', 'script', 'style', 'image', 'font']
	ngPersist.Config.dynamicTypes = ['json']
	ngPersist.Config.ignoreUrls = ['maps.googleapis']
	

	self.addEventListener('install', (event) => {
	  	console.log('[ServiceWorker] Install')
		// The promise that skipWaiting() returns can be safely ignored.
		self.skipWaiting();
		console.log('[ServiceWorker] skipWaiting')
	});

	self.addEventListener('activate', (event) => {
		console.log('[ServiceWorker] Activate')
		  	event.waitUntil(deleteOfflineData(ngPersist.Config))
		 	event.waitUntil(self.clients.claim());
		console.log('[ServiceWorker] Removing old app data')
	});

	self.addEventListener('fetch', (event) => {
	  	console.log('[ServiceWorker] Fetch', event.request.url)
	  	console.log('Request Mode: ', event.request.mode)
	  	console.log('Request Destination: ', event.request.destination)		

	  	event.respondWith(
			ngPersist.Run(event.request, ngPersist.Config)
		);
	    
	    console.log('[ServiceWorker] Fetched&Cached Data');
	});

})();