(function () {

	'use strict';

	// angular.module("ListaTelefonica").value("config", {
	// 	baseJsonUrl: "http://192.168.15.2:3000",
	// 	baseHtmlUrl: "http://192.168.15.2/angulartest"
	// });

	// Constants are similiars with values, but could be inject in Providers.
	angular.module("ListaTelefonica").constant("config", {
		appName: 'NgProgressiveWebApp',
		appInitials: 'NgP',
		appHome: window.location.origin,
		appModules: [],
		template: { templateName: 'template-01', showHeader: true, showFooter: true },
		templates: [{ templateName: 'template-01', showHeader: true, showFooter: true }, { templateName: 'template-02', showHeader: true, showFooter: true }, { templateName: 'template-03', showHeader: true, showFooter: true }],
		defaultRoute: '/picMe/picMe',
		previousRoute: '',
		version: '1.0',
		owner: 'Tiago Carmo Santos',
		year: '2018',
		site: 'https://br.linkedin.com/in/tiagocarmosantos',
		apiUrl: (location.hostname.toLowerCase() == 'localhost' ? 'http://localhost:3003/api' : 'https://microservice-sample.herokuapp.com/api'),
		oapiUrl: (location.hostname.toLowerCase() == 'localhost' ? 'http://localhost:3003/oapi' : 'https://microservice-sample.herokuapp.com/oapi'),
		userKey: '_lista_telefonica_app_user',
		user: { ID: null, Name: null, ImageURL: null, Email: null, idToken: null, Logado: false, Anonymous: false, onSignIn: () => {}, onSignOut: () => {} }
	}).run(['$rootScope', 'config', function ($rootScope, config) {

		fetch(`${window.location.origin}/modulesConfig.json`)
			.then(response => response.json())
			.then(data => { config.appModules = data })

		$rootScope.config = config
	}])
	
})()