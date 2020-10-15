(function () {
    
    'use strict';

    angular.module("AppTemplate").controller("NgMapController", ['$rootScope', '$scope', '$window', '$element', NgMap])

    function NgMap($rootScope, $scope, $window, $element) { 

        const vm = this;

	    function initMap() {
	    	var mapElem = $element[0]

			navigator.geolocation.getCurrentPosition(position => {
				const map = new google.maps.Map(mapElem, {
				  center: { lat: position.coords.latitude, lng: position.coords.longitude },
				  zoom: 8
				});
			});

	    };

        (function initController() {
            initMap()
        })();
        


    }

})()
