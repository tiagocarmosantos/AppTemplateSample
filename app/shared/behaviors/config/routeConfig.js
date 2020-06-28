(function () {
	
	'use strict';

	angular.module("ListaTelefonica").config(['$routeProvider', 'config', routeConfig])

	function routeConfig($routeProvider, config) {

		$routeProvider.when("/:dirName*", {
			templateUrl: function (urlattr) {
				return `/modules/${urlattr.dirName}.html`
			}
		}).otherwise({
	        redirectTo: '/contatos/contatos'
	    });

	}

})()
