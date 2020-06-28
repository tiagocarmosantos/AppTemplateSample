(function () {
	
	'use strict';

	// This interceptor it is used to by pass on browser's cache.
	angular.module("ListaTelefonica").factory('timeStampInterceptor', [timeStampInterceptor])

	function timeStampInterceptor(){
		return {
			request : function(config){
				var url = config.url;
				if (url.indexOf('view') > -1) return config;
				var timeStamp = new Date().getTime();
				config.url = url + "?timestamp=" + timeStamp;
				console.log(config.url);
				return config;
			}
		};
	}

})()

