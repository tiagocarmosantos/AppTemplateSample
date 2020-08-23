(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("picMeController", ['picMeAPI', 'mobileNgMsg', 'config', '$rootScope', '$scope', '$window', picMeController])

    function picMeController(picMeAPI, mobileNgMsg, config, $rootScope, $scope, $window) { 

        const vm = this
        vm.picsMe = Array(3).fill( { image: { content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMTIwIDMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImRhcmtjeWFuIj4NCiAgICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxNSI+DQogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGZyb209IjE1IiB0bz0iMTUiDQogICAgICAgICAgICAgICAgIGJlZ2luPSIwcyIgZHVyPSIwLjhzIg0KICAgICAgICAgICAgICAgICB2YWx1ZXM9IjE1Ozk7MTUiIGNhbGNNb2RlPSJsaW5lYXIiDQogICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsLW9wYWNpdHkiIGZyb209IjEiIHRvPSIxIg0KICAgICAgICAgICAgICAgICBiZWdpbj0iMHMiIGR1cj0iMC44cyINCiAgICAgICAgICAgICAgICAgdmFsdWVzPSIxOy41OzEiIGNhbGNNb2RlPSJsaW5lYXIiDQogICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgIDwvY2lyY2xlPg0KICAgIDxjaXJjbGUgY3g9IjYwIiBjeT0iMTUiIHI9IjkiIGZpbGwtb3BhY2l0eT0iMC4zIj4NCiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgZnJvbT0iOSIgdG89IjkiDQogICAgICAgICAgICAgICAgIGJlZ2luPSIwcyIgZHVyPSIwLjhzIg0KICAgICAgICAgICAgICAgICB2YWx1ZXM9Ijk7MTU7OSIgY2FsY01vZGU9ImxpbmVhciINCiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgZnJvbT0iMC41IiB0bz0iMC41Ig0KICAgICAgICAgICAgICAgICBiZWdpbj0iMHMiIGR1cj0iMC44cyINCiAgICAgICAgICAgICAgICAgdmFsdWVzPSIuNTsxOy41IiBjYWxjTW9kZT0ibGluZWFyIg0KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICA8L2NpcmNsZT4NCiAgICA8Y2lyY2xlIGN4PSIxMDUiIGN5PSIxNSIgcj0iMTUiPg0KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBmcm9tPSIxNSIgdG89IjE1Ig0KICAgICAgICAgICAgICAgICBiZWdpbj0iMHMiIGR1cj0iMC44cyINCiAgICAgICAgICAgICAgICAgdmFsdWVzPSIxNTs5OzE1IiBjYWxjTW9kZT0ibGluZWFyIg0KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbC1vcGFjaXR5IiBmcm9tPSIxIiB0bz0iMSINCiAgICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjAuOHMiDQogICAgICAgICAgICAgICAgIHZhbHVlcz0iMTsuNTsxIiBjYWxjTW9kZT0ibGluZWFyIg0KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICA8L2NpcmNsZT4NCjwvc3ZnPg==' }})

        vm.listPicMe = () => {
            var filter = ($rootScope.config.user.Logado ? { param: 'user.email', value: $rootScope.config.user.Email } : null)
            picMeAPI.getPicsMe(filter).then(data => { 
                if (data.length > 0 ) {
                    $scope.$evalAsync(() => {
                        vm.picsMe = data
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

        vm.qrCodePicMe = () => {
          console.log('qrCodePicMe')
          var canvas = document.querySelector("#picMeQRCode canvas")
          var routeNewPicMeAnonymousUser = `${config.appHome}${vm.routeNewPicMe}&name=Anonymous`

          QRCode.toCanvas(canvas, routeNewPicMeAnonymousUser)
          vm.showQRCode = !vm.showQRCode
        }

        vm.sharePicMe = (picMe) => {
            console.log('sharePicMe')
            
            fetch(picMe.image.content)
            .then(response => response.blob())
            .then(blob => {
                let file = new File([blob], 'image.png', { type: picMe.image.contentType })

                let shareData = {
                    text: `${config.appName} - ${config.user.Name}`,
                    title: picMe.image.title,
                    files: [file],
                    url: config.appHome
                }

                if (!!navigator.share) {
                    navigator.share(shareData).then((data) => {
                        mobileNgMsg.addSuccess('PicME Compartilhado!')
                    }).catch(error => { 
                        console.log(error)
                        mobileNgMsg.addError(`ERROR! ${error}`) 
                    })
                } else {
                    mobileNgMsg.addError('Share API is not compatible with this device!') 
                }

            })
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

