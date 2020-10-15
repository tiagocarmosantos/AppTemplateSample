(function () {
	
	'use strict';

	angular.module("AppTemplate").config(['$httpProvider', httpConfig])

	function httpConfig($httpProvider) {
		$httpProvider.defaults.cache = true;
	}

})()
