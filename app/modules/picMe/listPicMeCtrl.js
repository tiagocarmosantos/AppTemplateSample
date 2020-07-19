(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("listPicMeController", ['picMeAPI', '$rootScope', '$scope', '$window', '$location', '$timeout', listPicMeController])

    function listPicMeController(picMeAPI, $rootScope, $scope, $window, $location, $timeout) { 

        const vm = this
        vm.picsMe = Array(3).fill( { image: { content: '' }})

        vm.listPicMe = () => {
            var filter = ($rootScope.config.user.Logado ? { param: 'user.email', value: $rootScope.config.user.Email } : null)
            picMeAPI.getPicsMe(filter).then(data => { 
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
            $rootScope.config.template.showHeader = true
            $rootScope.config.template.showFooter = false
            vm.routeNewPicMe = `#!/picMe/newPicMe?email=${$rootScope.config.user.Email}`
            vm.routeNewPicMeAuthUser = `${vm.routeNewPicMe}&name=${$rootScope.config.user.Name}`
            vm.showQRCode = false
            vm.listPicMe()
        })()

        $scope.$on('$destroy', () => {
            $rootScope.config.template.showHeader = true
            $rootScope.config.template.showFooter = true
        })

        $scope.$on('$viewContentLoaded', () => {
          
        })
    }

})()

