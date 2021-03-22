(function () {
	'use strict';
     
	// Constants are similiars with values, but could be inject in Providers.
	angular.module("AppTemplate").constant("config", AppTemplateConfig)

	function AppTemplateConfig() {
		let config = {appConfigDynamic}
		return parseJSON(stringifyJSON(config))
	}
		
	angular.module("AppTemplate").run(['$rootScope', 'config', AppTemplateRun])

	function AppTemplateRun($rootScope, config) {
		$rootScope.config = config()
	}
	
})()