(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("listPicMeController", ['picMeAPI', '$rootScope', '$scope', '$window', '$location', '$timeout', listPicMeController])

    function listPicMeController(picMeAPI, $rootScope, $scope, $window, $location, $timeout) { 

        const vm = this
        vm.picsMe = Array(3).fill({ image: { content: '' }})

        vm.listPicMe = () => {
            picMeAPI.getPicsMe('user.email', $rootScope.User.Email).then(data => { 
               $scope.$evalAsync(() => { 
                  vm.picsMe = data
                })
            })
            .catch(error => {
                console.log(error)
            })
        }

        vm.qrCodePicMe = () => {
          console.log('qrCodePicMe')
          var canvas = document.querySelector("#picMeQRCode")
          var routeNewPicMeAnonymousUser = `${$window.location.origin}${vm.routeNewPicMe}&name=Anonymous`

          QRCode.toCanvas(canvas, routeNewPicMeAnonymousUser)
          vm.showQRCode = !vm.showQRCode
        }

        (function initController() {
            $rootScope.showHeader = true
            $rootScope.showFooter = false
            vm.routeNewPicMe = `#!/picMe/newPicMe?email=${$rootScope.User.Email}`
            vm.routeNewPicMeAuthUser = `${vm.routeNewPicMe}&name=${$rootScope.User.Name}`
            vm.showQRCode = false
            vm.listPicMe()
        })()

        $scope.$on('$destroy', () => {
            $rootScope.showHeader = true
            $rootScope.showFooter = true
        })

        $scope.$on('$viewContentLoaded', () => {
          
        })
    }

})()

