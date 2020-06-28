(function () {
	
	'use strict';
	
	// Factories are similars with Service and Providers.
	angular.module("ListaTelefonica").factory("contatosAPI", ['$http', 'config', contatosAPI])

	function contatosAPI($http, config) {

		var _getContatos = function(scope) {
			return $http.get(config.oapiUrl + "/contatos").then(function (data) { 
				scope.contatos = JSON.parse(JSON.stringify(data.data));
			}).catch(function (response) {
				scope.error = "Aconteceu um problema: Não foi possível carregar os dados!";
			});
		};

		var _getContatosInScope = function() {
			return $http.get(config.oapiUrl + "/contatos").then(function (data) { 
				return JSON.parse(JSON.stringify(data.data));
			}).catch(function (response) {
				return [];
			});
		};

		var _getContato = function(id) {
			return $http.get(config.oapiUrl + "/contatos/" + id).then(function (data) { 
				return JSON.parse(JSON.stringify(data.data));
			}).catch(function (response) {
				return "Aconteceu um problema: Não foi possível carregar os dados!";
			});
		};

		var _saveContato = function(scope, contato) {
			$http.post(config.oapiUrl + "/contatos", contato).then(function (data) {
				delete scope.contato;
				scope.contatoForm.$setPristine();
				scope.contatos.push(JSON.parse(JSON.stringify(data.data)));
			}).catch(function (response) {
				scope.error = "Aconteceu um problema: Não foi possível salvar o contato!";
			});
		};

		var _deleteContato = function(scope, contato) {
			$http.delete(config.oapiUrl + "/contatos/" + contato.id).then(function (data) {
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
