(function () {
	
	'use strict';

	angular.module("AppTemplate").controller("DetalhesContatoController", ['$scope', '$routeParams', 'contatosAPI', DetalhesContatoController])

	function DetalhesContatoController($scope, $routeParams, contatosAPI) { 

		console.log('here')

		$scope.contato = []

		console.log($routeParams)

		contatosAPI.getContato($routeParams.id).then((contato) => {
			$scope.contato = contato
		})
	}

})()

