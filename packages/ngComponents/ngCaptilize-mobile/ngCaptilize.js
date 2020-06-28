(function () {
	
	'use strict';

	angular.module("ngComponents").filter("capitalize", [mobileNgCapitalize])

	function mobileNgCapitalize() {
		return function(input) {
			var palavras = input.split(" ");
			var palavrasFormatadas = palavras.map(function(palavra) {
				if (/(da|de)/.test(palavra)) return palavra;
				return palavra.charAt(0).toUpperCase() + palavra.substring(1).toLowerCase();
			});
			return palavrasFormatadas.join(" ");
		};
	}

})();

