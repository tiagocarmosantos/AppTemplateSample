(function () {

	'use strict';

	// angular.module("ListaTelefonica").value("config", {
	// 	baseJsonUrl: "http://192.168.15.2:3000",
	// 	baseHtmlUrl: "http://192.168.15.2/angulartest"
	// });

	// Constants are similiars with values, but could be inject in Providers.
	angular.module("ListaTelefonica").constant("config", {
		appName: 'NPWA - NgProgressiveWebApp',
		template: { templateName: 'template-01', showHeader: true, showFooter: true },
		templates: [{ templateName: 'template-01', showHeader: true, showFooter: true }, { templateName: 'template-02', showHeader: true, showFooter: true }, { templateName: 'template-03', showHeader: true, showFooter: true }],
		defaultRoute: '/picMe/listPicMe',
		previousRoute: '',
		version: '1.0',
		owner: 'Tiago Carmo Santos',
		year: '2018',
		site: 'https://br.linkedin.com/in/tiagocarmosantos',
		apiUrl: 'https://microservice-sample.herokuapp.com/api',
		oapiUrl: 'https://microservice-sample.herokuapp.com/oapi',
		userKey: '_lista_telefonica_app_user',
		user: { ID: null, Name: null, ImageURL: null, Email: null, idToken: null, Logado: false, onSignIn: () => {}, onSignOut: () => {} }
	}).run(['$rootScope', 'config', function ($rootScope, config) {
        config.apiUrl = (location.hostname.toLowerCase() == 'localhost' ? 'http://localhost:3003/api' : config.apiUrl)
		config.oapiUrl = (location.hostname.toLowerCase() == 'localhost' ? 'http://localhost:3003/oapi' : config.oapiUrl)
		$rootScope.config = config
	}])
	
})()