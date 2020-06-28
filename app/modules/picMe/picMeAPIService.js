(function () {
	
	'use strict';
	
	// Factories are similars with Service and Providers.
	angular.module("ListaTelefonica").factory("picMeAPI", ['$http', 'config', picMeAPI])

	function picMeAPI($http, config) {

		var _getPicsMe = function() {
			return $http.get(config.oapiUrl + "/picMe").then(function (response) { 
				return JSON.parse(JSON.stringify(response.data))
			}).catch(function (response) {
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível carregar os dados!')
			})
		}

		var _getPicMe = function(id) {
			return $http.get(config.oapiUrl + "/picMe/" + id).then(function (response) { 
				return JSON.parse(JSON.stringify(response.data))
			}).catch(function (response) {
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível carregar os dados!')
			})
		}

		var _savePicMe = function(picMe) {
			return $http.post(config.oapiUrl + "/picMe", picMe).then(function (response) {
				//debugger;
				return JSON.parse(JSON.stringify(response.config.data))
			}).catch(function (response) {
				//debugger;
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível salvar os dados!')
			})
		}

		var _deletePicMe = function(picMe) {
			return $http.delete(config.oapiUrl + "/picMe/" + picMe.id).then(function (response) {
				return JSON.parse(JSON.stringify(response.data))
			}).catch(function (response) {
				console.log(response)
				throw Error('Aconteceu um problema: Não foi possível deletar os dados!')
			})
		}

    	var _createFilter = function(name, config) {
            return  {
                      name: name,
                      config: config,
                      apply: (element) => {
                          element.style.filter = `${name}(${config})`
                      }
                    }
        }

    	var _getFilters = function() {
          return {
              filterIndex: 0,
              options: [_createFilter('grayscale', '1'), _createFilter('sepia', '1'), _createFilter('blur', '5px'), _createFilter('brightness', '0.45'), _createFilter('contrast', '1'), _createFilter('hue-rotate', '90deg'), _createFilter('hue-rotate2', '1'), _createFilter('hue-rotate3', '1'), _createFilter('saturate', '4'), _createFilter('invert', '.8'), _createFilter('opacity', '.5'), _createFilter('none', '')],
              random: function (element) {
            	this.options[_randomNumber(0, this.options.length-1)].apply(element)
              },
              next: function (element) {
                this.options[this.filterIndex++ % this.options.length].apply(element)
              },
              previous: function (element) {
                this.options[this.filterIndex-- % this.options.length].apply(element)
              }
          }
        }

        var _randomNumber = function (min, max) {
            return (Math.floor(Math.random() * max) + min)
        }

        var _downloadURL = function (values, name, type) {
          let downloadLink = document.createElement('a')
          downloadLink.href = values
          downloadLink.target = '_blank'
          downloadLink.download = name
          downloadLink.click()
        }

        var _downloadBlob = function (values, name, type) {
			var blob = new Blob([values], { type: type })
			var url = URL.createObjectURL(blob)
			_downloadURL(url, name, type)
			URL.revokeObjectURL(blob)
		}

		return {
			getPicsMe: _getPicsMe,
			getPicMe: _getPicMe,
			savePicMe: _savePicMe,
			deletePicMe: _deletePicMe,
			createFilter: _createFilter,
			getFilters: _getFilters,
			randomNumber: _randomNumber,
			downloadURL: _downloadURL,
			downloadBlob: _downloadBlob
		}
	}

})()
