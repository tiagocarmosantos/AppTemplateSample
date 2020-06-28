(function () {
	
	'use strict';

	angular.module("ListaTelefonica").config(['$httpProvider', interceptorConfig])

	function interceptorConfig($httpProvider) {
		//console.log($httpProvider);
		//$httpProvider.interceptors.push("timeStampInterceptor");
		$httpProvider.interceptors.push("errorInterceptor");
		$httpProvider.interceptors.push("loadingInterceptor");
	}

})()

