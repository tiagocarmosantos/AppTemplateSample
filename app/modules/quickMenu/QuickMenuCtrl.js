(function () {
    
    'use strict';

    angular.module("AppTemplate").controller("QuickMenuController", ['quickMenuAPI', 'imageGenerator', 'IAGenerator', 'mobileNgMsg', '$rootScope', '$scope', '$window', QuickMenuController])

    function QuickMenuController(quickMenuAPI, imageGenerator, IAGenerator, mobileNgMsg, $rootScope, $scope, $window) { 

        const vm = this

        vm.zoomQuickMenu = $event => {
          console.log($event.target)
          if ($event.target.style.transform == ''){
            $event.target.style.transform = 'scale(1.5)'
          } else {
            $event.target.style.transform = ''  
          }
          console.log($event.target.style.transform)
        }

        vm.clearQuickMenu = () => {
            vm.menu.title = ''
            vm.menu.subTitle = ''
            vm.menu.image = {}
            imageGenerator.drawImage('newImage', '') 
            vm.editMode = false
        }

        vm.saveQuickMenu = () => {
          if (!!vm.menu.title && !!vm.menu.subTitle && !!vm.menu.image.content) {
              quickMenuAPI.saveQuickMenu(vm.menu).then(data => {
                  vm.menus.push(Object.assign({},  data))
                  mobileNgMsg.addSuccess('Menu Adicionado com Sucesso!')
                  vm.clearQuickMenu()
              })
          }
        }

        vm.listQuickMenu = () => {
          quickMenuAPI.getQuickMenus().then(data => { 
              vm.menus = data
          })
        }

        vm.InitLoadImageQuickMenu = () => {
            $rootScope.loading = true
        }

        vm.FinishLoadImageQuickMenu = () => {
            var moderateConfig = { className: 'menu', probability: 0.97 }
            IAGenerator.moderateFromIA('newImage', moderateConfig).then(predictionsApproved => {
                $scope.$apply(() => { 
                   vm.editMode = true
                   $rootScope.loading = false
                })
            }).catch(predictionsReproved => {
                mobileNgMsg.addError(predictionsReproved.Msg)
                mobileNgMsg.addError(predictionsReproved.Predictions)

                $scope.$evalAsync(() => { 
                    vm.clearQuickMenu()
                    $rootScope.loading = false
                })
            })
        }

        (function initController() {
            vm.editMode = false
            vm.listQuickMenu()
        })();

    }

})()

