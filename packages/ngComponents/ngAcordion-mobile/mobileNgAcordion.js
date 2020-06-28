(function () {
	
	'use strict';

	angular.module("ngComponents").run(['$templateCache', mobileNgAcordionTemplate])

	function mobileNgAcordionTemplate($templateCache) {
		// The templateCache would be created automatically with GRUNT tool.
	   $templateCache.put('view/MobileNgAcordion_Template.html', '<div ng-click="open()" class="btn btn-primary btn-block">{{title}}</div><div ng-show="isOpened" ng-transclude></div>');
	}

	angular.module("ngComponents").directive("mobileNgAcordions", [mobileNgAcordions])

	function mobileNgAcordions() {
		return {
            restrict: 'E',
			controller: function() {
				var accordions = [];

				this.registerAccordion = function(accordion) {
					accordions.push(accordion);
				};

				this.closeAll = function(){
					accordions.forEach(function(accordion) {
						accordion.isOpened = false;
					});
				}

				this.getAccordions = function() {
				    return accordions;
				}
			}
		}
	}

	angular.module("ngComponents").directive("mobileNgAcordion", [mobileNgAcordion])

	function mobileNgAcordion() {
		return {
			transclude: true,
			restrict: 'E',
			require: '^mobileNgAcordions',
		    templateUrl: 'view/MobileNgAcordion_Template.html',
			scope: {
				title: "@"
			},
			link: function(scope, ctrl, mobileNgAcordion, mobileNgAcordions) {
			    mobileNgAcordions.registerAccordion(scope);
			    scope.open = function() {
			        if (mobileNgAcordions.getAccordions().length > 1) {
			            mobileNgAcordions.closeAll();
			            scope.isOpened = true;
			        } else {
			            scope.isOpened = ((scope.isOpened == true) ? false : true);
			        }
				}
			}
		}
	}

})();



