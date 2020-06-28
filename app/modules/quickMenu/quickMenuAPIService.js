(function () {
	
	'use strict';
	
	// Factories are similars with Service and Providers.
	angular.module("ListaTelefonica").factory("quickMenuAPI", ['$http', 'config', quickMenuAPI])

	function quickMenuAPI($http, config) {

		var _getQuickMenus = function() {
			return $http.get(config.oapiUrl + "/quickMenu").then(function (response) { 
				return JSON.parse(JSON.stringify(response.data))
			}).catch(function (response) {
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível carregar os dados!')
			});
		};

		var _getQuickMenu = function(id) {
			return $http.get(config.oapiUrl + "/quickMenu/" + id).then(function (response) { 
				return JSON.parse(JSON.stringify(response.data))
			}).catch(function (response) {
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível carregar os dados!')
			});
		};

		var _saveQuickMenu = function(quickMenu) {
			return $http.post(config.oapiUrl + "/quickMenu", quickMenu).then(function (response) {
				//debugger;
				return JSON.parse(JSON.stringify(response.config.data))
			}).catch(function (response) {
				//debugger;
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível salvar os dados!')
			});
		};

		var _deleteQuickMenu = function(quickMenu) {
			return $http.delete(config.oapiUrl + "/quickMenu/" + quickMenu.id).then(function (response) {
				return JSON.parse(JSON.stringify(response.data))
			}).catch(function (response) {
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível deletar os dados!')
			});
		};

		return {
			getQuickMenus: _getQuickMenus,
			getQuickMenu: _getQuickMenu,
			saveQuickMenu: _saveQuickMenu,
			deleteQuickMenu: _deleteQuickMenu
		};
	}

})()
