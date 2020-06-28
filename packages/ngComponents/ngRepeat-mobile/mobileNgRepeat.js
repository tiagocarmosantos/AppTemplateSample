(function () {
    
    'use strict';

    angular.module("ngComponents").directive('repeatStart', [repeatStart])

    function repeatStart() {
        return function (scope, element, attrs) {
            if (scope.$first) {
                scope.$eval(attrs.repeatStart);
            }
        }
    }

    angular.module("ngComponents").directive('repeatFinish', [repeatFinish])

    function repeatFinish() {
        return function (scope, element, attrs) {       
            if (scope.$last) {
                scope.$eval(attrs.repeatFinish);
            }
        }
    }
    

})();




