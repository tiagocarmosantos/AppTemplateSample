(function () {
	
	'use strict';

	// This interceptor it is used to by pass on browser's cache.
	angular.module("ListaTelefonica").factory('authInterceptor', ['$rootScope', '$location', authInterceptor])

	function authInterceptor($rootScope, $location) {
		return {
			request : function (config) {
				if ((config.method.toUpperCase() == 'GET') && (config.url.slice(0, 8) == "/modules")) {
					if ($rootScope.config.user.Logado == false) {
						$location.path("/auth/login")
					}
				}
				return config
			}
		};
	}

})()
