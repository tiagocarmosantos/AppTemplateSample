(function () {
	'use strict';
     
	// Constants are similiars with values, but could be inject in Providers.
	angular.module("AppTemplate").constant("config", () => {
		let config = {appConfigDynamic}
		return parseJSON(stringifyJSON(config))
	})
		
	angular.module("AppTemplate").run(['$rootScope', 'config', function ($rootScope, config) {
		$rootScope.config = config()
	}])
	
})()