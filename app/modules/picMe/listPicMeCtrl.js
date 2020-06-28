(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("listPicMeController", ['picMeAPI', '$rootScope', '$scope', '$window', listPicMeController])

    function listPicMeController(picMeAPI, $rootScope, $scope, $window) { 

        const vm = this
        vm.picsMe = [{ image: { content: '' }}, { image: { content: '' }}, { image: { content: '' }}, { image: { content: '' }}, { image: { content: '' }}, { image: { content: '' }}, { image: { content: '' }}]

        vm.listPicMe = () => {
          picMeAPI.getPicsMe()
            .then((data) => { 
              vm.picsMe = data
            })
            .catch(error => {
                  console.log(error)
            })
        }

        vm.qrCodePicMe = () => {
          console.log('qrCodePicMe')
          var canvas = document.querySelector("#picMeQRCode")
          var urlNewPicMe = `${window.location.origin}${vm.routeNewPicMe}`

          QRCode.toCanvas(canvas, urlNewPicMe)
          vm.showQRCode = !vm.showQRCode
        }

        (function initController() {
            $rootScope.showHeader = true
            $rootScope.showFooter = false
            vm.routeNewPicMe = '#!/picMe/newPicMe'
            vm.showQRCode = false
            vm.listPicMe()
        })()

        // Clean up stuff
        $scope.$on('$destroy', () => {
          
        })

        // Here your view content is fully loaded !!
        $scope.$on('$viewContentLoaded', () => {
          
        })

    }

})()

