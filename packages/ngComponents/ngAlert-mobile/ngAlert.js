(function () {
	
	'use strict';

	angular.module("ngComponents").directive("mobileNgAlert", [mobileNgAlert])

	function mobileNgAlert() {
		return {
			templateUrl: "Templates/alert.html",
			replace: true,
			restrict: "AE",
			scope: {
				title: "@",
				message: "=",
			},
			transclude: false
		};
	}

})();
