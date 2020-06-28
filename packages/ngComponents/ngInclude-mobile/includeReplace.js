(function () {
	
	'use strict';

	angular.module("ngComponents").directive("includeReplace", ["$timeout", includeReplace])

	function includeReplace($timeout) {
		return {
			require: "ngInclude",
			restrict: "A",
			link: function(scope, el, attrs) {
				el.replaceWith(el.children())
				$timeout(() => { componentHandler.upgradeAllRegistered(); }, 0)
			}
		};
	}

})();
