(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("PostItController", ['$rootScope', '$scope', '$window', PostItController])

    function PostItController($rootScope, $scope, $window) { 

        const vm = this

        vm.listPostIts = function () {
            console.log(vm.file)

            $scope.$apply(() => {
              vm.file.content.map((questionario) => {
                var itensQuest = Object.entries(questionario)
                itensQuest.map((itens) => {
                    vm.postIts.push(Object.assign({}, { name: itensQuest[1][1], title: itens[0], description: itens[1] }))
                })
              })
            })

            console.log(vm.postIts)
        };

        vm.printElement = function (elem)
        {
            console.log('testePrint')
            var mywindow = $window.open('', 'PRINT', 'height=600,width=800')
            
            var copyDocument = $window.document.documentElement
            Array.from(copyDocument.getElementsByClassName('no-print')).map((item) => { item.style.display = 'none' })

            setTimeout(() => { mywindow.document.write(copyDocument.innerHTML) }, 5000)
            setTimeout(() => { mywindow.document.close() }, 3000)
            setTimeout(() => { mywindow.focus() }, 5000)
            //setTimeout(() => { mywindow.print() }, 3000)
            //setTimeout(() => { mywindow.close() }, 3000)

            return true
        };

        (function initController() {
            vm.editMode = false
            vm.file = {}
            vm.postIts = []
            vm.postIt = { id: null, name: '', title: '', description: ''}
        })();

    }

})()

