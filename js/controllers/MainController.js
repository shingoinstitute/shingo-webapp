(function(){
    'use strict';

    angular.module('interface')
    .controller('MainController', ['$scope', '$rootScope', '$mdSidenav', MainController]);

    function MainController($scope, $rootScope, $mdSidenav){
        var vm = this;

        vm.showLoading = true;

        vm.toggle = function(id){
            $mdSidenav(id).toggle();
        }

        $rootScope.$on('$stateChangeStart', function(){
            console.log("Showing loading")
            vm.showLoading = true;
        });

        $rootScope.$on('$stateChangeSuccess', function(){
            console.log("Hiding loading")
            vm.showLoading = false;
        });

        $rootScope.$on('$stateChangeError', function(ev, toState, toParams, fromState, fromParams, error){
            // TODO: Display error message to user
        });
    }
})();