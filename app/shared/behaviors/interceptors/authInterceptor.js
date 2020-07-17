(function () {
	
	'use strict';

	// This interceptor it is used to by pass on browser's cache.
	angular.module("ListaTelefonica").factory('authInterceptor', ['$rootScope', '$location', authInterceptor])

	function authInterceptor($rootScope, $location) {
		return {
			request : function (config) {
				if (!$rootScope.config.user.Logado) {
					$location.path("/auth/login")
				}

				return config
			}
		};
	}

})()
