(function () {
	
	'use strict';

	// Services are similars with Factories and Providers.
	angular.module("AppTemplate").service("operadorasAPI", ['$http', '$rootScope', operadorasAPI])

	function operadorasAPI($http, $rootScope) {
		
		this.getOperadoras = function() {
			return $http.get($rootScope.config.oapiUrl.getOApiUrl() + "/operadoras").then(function (data) { 
				return JSON.parse(JSON.stringify(data.data));
			});
		};

	}

})()
