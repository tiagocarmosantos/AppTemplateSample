(function () {
	
	'use strict';

	// Services are similars with Factories and Providers.
	angular.module("ListaTelefonica").service("operadorasAPI", ['$http', 'config', operadorasAPI])

	function operadorasAPI($http, config) {
		
		this.getOperadoras = function() {
			return $http.get(config.oapiUrl + "/operadoras").then(function (data) { 
				return JSON.parse(JSON.stringify(data.data));
			});
		};

	}

})()
