(function () {
	
	'use strict';
	
	// Factories are similars with Service and Providers.
	angular.module("ListaTelefonica").factory("filterAPI", ['mobileNgMath', filterAPI])

	function filterAPI(mobileNgMath) {

    var _createFilter = (name, config) => {
          return  {
                    name: name,
                    config: config,
                    apply: (element) => {
                        element.style.filter = (!!config ? `${name}(${config})` : name) 
                    }
                  }
      }

    	var _getFilters = () => {
          return {
              filterIndex: 0,
              options: [_createFilter('grayscale', '1'), _createFilter('sepia', '1'), _createFilter('blur', '5px'), _createFilter('brightness', '0.45'), _createFilter('contrast', '1'), _createFilter('hue-rotate', '90deg'), _createFilter('hue-rotate2', '1'), _createFilter('hue-rotate3', '1'), _createFilter('saturate', '4'), _createFilter('invert', '.8'), _createFilter('opacity', '.5'), _createFilter('none', '')],
              random: function (element) {
            	    this.options[mobileNgMath.randomNumber(0, this.options.length-1)].apply(element)
              },
              next: function (element) {
                this.options[this.filterIndex++ % this.options.length].apply(element)
              },
              previous: function (element) {
                this.options[this.filterIndex-- % this.options.length].apply(element)
              }
          }
        }     

		return {
			createFilter: _createFilter,
			getFilters: _getFilters
		}
	}

})()
