(function(){
    'use strict';

    angular.module('interface')
    .controller('MainController', ['$scope', '$rootScope', '$mdSidenav', 'Sessions', MainController]);

    function MainController($scope, $rootScope, $mdSidenav, Sessions){
        var vm = this;

        vm.showLoading = true;
        vm.filter;

        vm.toggle = function(id){
            $mdSidenav(id).toggle();
        }

        $scope.isKeynote = function(obj){
            return obj.Session_Speaker_Associations__r !== null;
        }

        $rootScope.$on('toggle filter', function(ev, state){
            vm.showFilter = state;
        });

        $rootScope.$on('$stateChangeStart', function(){            
            vm.showLoading = true;
        });

        $rootScope.$on('$stateChangeSuccess', function(ev, toState, toParams, fromState, fromParams){
            vm.filter = angular.noop();
            $mdSidenav('sidenav').close();
            vm.showLoading = false;
        });

        $rootScope.$on('$stateChangeError', function(ev, toState, toParams, fromState, fromParams, error){
            // TODO: Display error message to user
        });
    }
})();