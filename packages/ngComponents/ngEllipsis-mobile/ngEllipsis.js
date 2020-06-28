(function () {
	
	'use strict';

	angular.module("ngComponents").filter("ellipsis", [mobileNgEllipsis])

	function mobileNgEllipsis() {
		return function(input, size) {
			if (input.length <= size) return input;
			var output = input.substring(0, (size || 2)) + "...";
			return output;
		};
	}

})();
