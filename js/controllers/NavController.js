(function(){
    'use strict';

    angular.module('interface')
    .controller('NavController', ['$scope', '$state', '$mdSidenav', NavController]);

    function NavController($scope, $state, $mdSidenav){
        $scope.states = [{'name': 'eventList', 'title': 'Upcoming Events'}];


        $scope.toggle = function(navId){
            $mdSidenav(navId)
                .toggle();
        }
    }
})();