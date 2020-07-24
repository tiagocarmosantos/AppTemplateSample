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
            
            let redirectRoute = (!!$rootScope.config.previousRoute ? $rootScope.config.previousRoute : $rootScope.config.defaultRoute)
            $window.location.assign(`${$window.location.origin}/#!${redirectRoute}`)
        }

        function onSignOut () {
            gapi.auth2.getAuthInstance().signOut().then(() => {
                console.log('User signed out.')
                initUser()
                $window.location.reload()
            })
        }

        function initUser () {
             return $rootScope.config.user = vm.User = {
                ID: null,
                Name: null,
                ImageURL: null,
                Email: null,
                Logado: false,
                Anonymous: false,
                onSignIn: onSignIn,
                onSignOut: onSignOut
            }
        }

        (function initController() {
            console.log('Login')
            $rootScope.config.template.showFooter = false
            $rootScope.config.template.showHeader = false

            document.User = initUser()

            gapi.signin2.render('googleBtn', { onsuccess: vm.User.onSignIn, onfailure: vm.User.onSignOut });
        })();

        // Clean up stuff
        $scope.$on('$destroy', () => {
            //  TODO SOMETHING
            $rootScope.config.template.showFooter = true
            $rootScope.config.template.showHeader = true
        });

        // Here your view content is fully loaded !!
        $scope.$on('$viewContentLoaded', () => {
            //  TODO SOMETHING
        });
    }

})()

