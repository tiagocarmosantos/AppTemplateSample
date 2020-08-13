(function() {

	'use strict';

	angular.module('ngComponents').factory('mobileNgMath', [mobileNgMath]);

	function mobileNgMath() {
		
		function randomNumber(min, max) {
            return (Math.floor(Math.random() * max) + min)
        }

		return { randomNumber }

	};

})();