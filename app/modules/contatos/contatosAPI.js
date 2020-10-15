(function () {
	
	'use strict';
	
	// Factories are similars with Service and Providers.
	angular.module("AppTemplate").factory("contatosAPI", ['$http', '$rootScope', contatosAPI])

	function contatosAPI($http, $rootScope) {

		var _getContatosInScope = function(scope) {
			return $http.get($rootScope.config.oapiUrl.getOApiUrl() + "/contatos").then(function (data) { 
				scope.contatos = JSON.parse(JSON.stringify(data.data));
			}).catch(function (response) {
				scope.error = "Aconteceu um problema: Não foi possível carregar os dados!";
			});
		};

		var _getContatos = function() {
			return $http.get($rootScope.config.oapiUrl.getOApiUrl() + "/contatos").then(function (data) { 
				return JSON.parse(JSON.stringify(data.data));
			}).catch(function (response) {
				return [];
			});
		};

		var _getContato = function(id) {
			return $http.get($rootScope.config.oapiUrl.getOApiUrl() + "/contatos/" + id).then(function (data) { 
				return JSON.parse(JSON.stringify(data.data));
			}).catch(function (response) {
				return "Aconteceu um problema: Não foi possível carregar os dados!";
			});
		};

		var _saveContato = function(scope, contato) {
			$http.post($rootScope.config.oapiUrl.getOApiUrl() + "/contatos", contato).then(function (data) {
				delete scope.contato;
				scope.contatoForm.$setPristine();
				scope.contatos.push(JSON.parse(JSON.stringify(data.data)));
			}).catch(function (response) {
				scope.error = "Aconteceu um problema: Não foi possível salvar o contato!";
			});
		};

		var _deleteContato = function(scope, contato) {
			$http.delete($rootScope.config.oapiUrl.getOApiUrl() + "/contatos/" + contato.id).then(function (data) {
				scope.contatos.splice(scope.contatos.indexOf(contato), 1);
			}).catch(function (response) {
				scope.error = "Aconteceu um problema: Não foi possível deletar o contato!";
			});
		};

		return {
			getContatos: _getContatos,
			getContatosInScope: _getContatosInScope,
			getContato: _getContato,
			saveContato: _saveContato,
			deleteContato: _deleteContato
		};
	}

})()
