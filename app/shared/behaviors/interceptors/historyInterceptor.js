(function () {
	
	'use strict';

	// This interceptor it is used to by pass on browser's cache.
	angular.module("ListaTelefonica").factory('historyInterceptor', ['$rootScope', '$window', '$location', historyInterceptor])

	function historyInterceptor($rootScope, $window, $location) {
		return {
			request : function (config) {
				
				if ((config.method.toUpperCase() == 'GET') && (config.url.slice(0, 8) == "/modules")) {
					$rootScope.config.previousRoute = location.hash.replace('#!', '')
				}

				return config
			}
		};
	}

})()
