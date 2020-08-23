(function () {
	
	'use strict';

	angular.module("ListaTelefonica").config(['$routeProvider', 'config', routeConfig])

	function routeConfig($routeProvider, config) {

		$routeProvider.when("/:dirName*", {
			templateUrl: function (urlattr) {
				console.log(urlattr.dirName.trim().toLowerCase())
				return (
							urlattr.dirName.trim().toLowerCase() == `auth/login`
							? `/shared/security/${urlattr.dirName}.html`
							: `/modules/${urlattr.dirName}.html`
					   ) 
			}
		}).otherwise({
	        redirectTo: `/picMe/picMe`
	    });

	}

})()
