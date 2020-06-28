(function () {
	
	'use strict';

	angular.module("ListaTelefonica").factory('errorInterceptor', ['$q', '$location', errorInterceptor])

	function errorInterceptor($q, $location){
		return {
			responseError : function(rejection){
				if(rejection.status == 404) {
					$location.path("/error");
				}
				
				 if(rejection.status <= 0) {
					
				 	if (rejection.status == -1) {
				 		//console.log("Rejection Status: " + rejection.status);
				 		//console.log("Rejection URL: " + rejection.config.url);
				 		//console.log("Caches: " + caches);
				 		var deferred = $q.defer();	
				 		caches.match(rejection.config.url).then(function(response) {
				 			//console.log("Cache Response: " + response);
				 			if (response) {
				 				response.json().then(function(json) {
				 					rejection.data = json;
				 					rejection.status = 200;
				 					deferred.resolve(rejection);
				 					//console.log("Resolve promise with ", rejection);
				 				})
				 				//console.log("deferred Reject: " + false);  
				 			} else {
				 				//console.log("deferred Reject: " + true);
				 				return deferred.reject(rejection);
				 			} 
				 		})
				 		return deferred.promise;

				 	}
				 } 
				return $q.reject(rejection);
			}
		};
	}

})()

