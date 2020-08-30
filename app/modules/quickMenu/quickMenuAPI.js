(function () {
	
	'use strict';
	
	// Factories are similars with Service and Providers.
	angular.module("ListaTelefonica").factory("quickMenuAPI", ['$http', 'config', quickMenuAPI])

	function quickMenuAPI($http, config) {

		var _getQuickMenus = () => {
			return $http.get(`${config.oapiUrl.getOApiUrl()}/quickMenu`).then(response => { 
				return JSON.parse(JSON.stringify(response.data))
			}).catch(error => {
				throw Error('Aconteceu um problema: Não foi possível carregar os dados!')
			});
		};

		var _getQuickMenu = id => {
			return $http.get(`${config.oapiUrl.getOApiUrl()}/quickMenu/${id}`).then(response => { 
				return JSON.parse(JSON.stringify(response.data))
			}).catch(error => {
				throw Error('Aconteceu um problema: Não foi possível carregar os dados!')
			});
		};

		var _saveQuickMenu = quickMenu => {
			return $http.post(`${config.oapiUrl.getOApiUrl()}/quickMenu`, quickMenu).then(response => {
				return JSON.parse(JSON.stringify(response.data))
			}).catch(error => {
				throw Error('Aconteceu um problema: Não foi possível salvar os dados!')
			});
		};

		var _deleteQuickMenu = id => {
			return $http.delete(`${config.oapiUrl.getOApiUrl()}/quickMenu/${id}`).then(response => {
				return JSON.parse(JSON.stringify(response.data))
			}).catch(error => {
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
