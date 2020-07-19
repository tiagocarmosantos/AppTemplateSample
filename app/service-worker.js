(function () {
	// 2020-07-19:v01.184900
	
 	'use strict';

	self.importScripts('./shared/behaviors/deps.persist.js')
	
	var ngPersist = getNgPersist()
	ngPersist.Config.appDataName = 'appData_AngularTest'
	ngPersist.Config.staticTypes = ['document', 'manifest', 'script', 'style', 'image', 'font']
	ngPersist.Config.dynamicTypes = ['json']
	ngPersist.Config.ignoreUrls = ['maps.googleapis']
	

	self.addEventListener('install', (event) => {
	  	console.log('[ServiceWorker] Install')
	  	// The promise that skipWaiting() returns can be safely ignored.
  		self.skipWaiting();
	});

	self.addEventListener('activate', (event) => {
		console.log('[ServiceWorker] Activate')
	  	event.waitUntil(deleteOfflineData(ngPersist.Config))
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