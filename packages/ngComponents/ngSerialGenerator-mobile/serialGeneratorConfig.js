(function () {
	
	'use strict';

	// This is a Provider´s Config.
	angular.module("ngComponents").config(['serialGeneratorProvider', serialGeneratorConfig])

	function serialGeneratorConfig(serialGeneratorProvider) {
		//console.log("Provider Configuration Default: " + serialGeneratorProvider.getLength());
		//console.log("Provider Configuration RunTime: " + serialGeneratorProvider.setLength(3));
		serialGeneratorProvider.setLength(3)
	}

})()

