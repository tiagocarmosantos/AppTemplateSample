(function () {
	
	'use strict';

	angular.module("ListaTelefonica").controller("NovoContatoController", ['$scope', 'contatosAPI', 'serialGenerator', '$location', 'operadorasAPI', NovoContatoController])

	function NovoContatoController($scope, contatosAPI, serialGenerator, $location, operadorasAPI) { 

		$scope.operadoras = []
		
		operadorasAPI.getOperadoras().then((operadoras) => {
			$scope.operadoras = operadoras
		})

		$scope.adicionarContato = function(contato){
			contato.serial = serialGenerator.generate();
			contato.data = new Date();
			contatosAPI.saveContato($scope, contato);
			$location.path("/contatos");
		};
		
	}

})()
