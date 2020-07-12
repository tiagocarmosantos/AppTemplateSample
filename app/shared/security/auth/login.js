(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("loginController", ['$rootScope', '$scope', '$window', loginController])

    function loginController($rootScope, $scope, $window) { 

        const vm = this;

        function onSignIn (googleUser) {
            console.log('User signed in.');

            var profile = googleUser.getBasicProfile()
            vm.User.ID = profile.getId()
            vm.User.Name = profile.getName()
            vm.User.ImageURL = profile.getImageUrl()
            vm.User.Email = profile.getEmail()
            vm.User.Logado = true
            vm.User.idToken = googleUser.getAuthResponse().id_token;

            $window.location.assign(`${$window.location.origin}/#!/picMe/listPicMe`)
        }

        function onSignOut () {
            gapi.auth2.getAuthInstance().signOut().then(() => {
                console.log('User signed out.')
                initUser()
                $window.location.reload()
            })
        }

        function initUser () {
             return $rootScope.User = vm.User = {
                ID: null,
                Name: null,
                ImageURL: null,
                Email: null,
                Logado: false,
                onSignIn: onSignIn,
                onSignOut: onSignOut
            }
        }

        (function initController() {
            console.log('Login')
            $rootScope.showFooter = false
            $rootScope.showHeader = false

            document.User = initUser()

            gapi.signin2.render('googleBtn', { onsuccess: vm.User.onSignIn, onfailure: vm.User.onSignOut });
        })();

        // Clean up stuff
        $scope.$on('$destroy', () => {
            //  TODO SOMETHING
            $rootScope.showFooter = true
            $rootScope.showHeader = true
        });

        // Here your view content is fully loaded !!
        $scope.$on('$viewContentLoaded', () => {
            //  TODO SOMETHING
        });
    }

})()

