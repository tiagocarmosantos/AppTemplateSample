(function () {
	
	'use strict';

	// This interceptor it is used to by pass on browser's cache.
	angular.module("ListaTelefonica").factory('authInterceptor', ['$rootScope', '$location', authInterceptor])

	function authInterceptor($rootScope, $location) {
		return {
			request : function (config) {
				if ((config.method.toUpperCase() == 'GET') && (config.url.slice(0, 8) == "/modules")) {
					$rootScope.config.user.Anonymous =  false
					if (location.hash.indexOf('?') > -1) {
						$rootScope.config.user.Anonymous = location.hash.slice(location.hash.indexOf('?') + 1).split('&')
															.map(item => { return { key: item.split('=')[0], value: item.split('=')[1] } })
															.filter(item => { return item.key.toLowerCase() == 'name' && item.value.toLowerCase() == 'anonymous' })
															.length > 0
					}

					if ($rootScope.config.user.Logado == false && $rootScope.config.user.Anonymous == false) {
						$location.path("/auth/login")
					}
				}
				return config
			}
		};
	}

})()
