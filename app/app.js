(function () {
	
	'use strict';

	angular.module('ListaTelefonica', ['ngRoute', 'ngSanitize', 'ngComponents']);

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
	         .register('./service-worker.js')
	         .then(function() { console.log('[ServiceWorker] Registered'); });
	}

})()