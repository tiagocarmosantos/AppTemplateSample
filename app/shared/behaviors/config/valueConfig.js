(function () {

	'use strict';

	// angular.module("ListaTelefonica").value("config", {
	// 	baseJsonUrl: "http://192.168.15.2:3000",
	// 	baseHtmlUrl: "http://192.168.15.2/angulartest"
	// });

	// Constants are similiars with values, but could be inject in Providers.
	angular.module("ListaTelefonica").constant("config", {
		appName: 'NPWA - NgProgressiveWebApp',
		template: { templateName: 'template-01'},
		templates: [{ templateName: 'template-01'}, { templateName: 'template-02'}, { templateName: 'template-03'}],
		version: '1.0',
		owner: 'Tiago Carmo Santos',
		year: '2018',
		site: 'https://br.linkedin.com/in/tiagocarmosantos',
		//apiUrl: 'http://localhost:3003/api',
		//oapiUrl: 'http://localhost:3003/oapi',
		apiUrl: 'https://microservice-sample.herokuapp.com/api',
		oapiUrl: 'https://microservice-sample.herokuapp.com/oapi',
		userKey: '_lista_telefonica_app_user'
	}).run(['$rootScope', 'config', function ($rootScope, config) {
		$rootScope.config = config
		$rootScope.showHeader = true
		$rootScope.showFooter = true
	}])
	
})()