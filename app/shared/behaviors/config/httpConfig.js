(function () {
	
	'use strict';

	angular.module("ListaTelefonica").config(['$httpProvider', httpConfig])

	function httpConfig($httpProvider) {
		$httpProvider.defaults.cache = true;
	}

})()
