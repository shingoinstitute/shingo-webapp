(function(){
    'use strict';

    angular.module('interface')
    .controller('NavController', ['$scope', '$state', '$mdSidenav', NavController]);

    function NavController($scope, $state, $mdSidenav){
        $scope.states = [{'name': 'eventList', 'title': 'Upcoming Events'}];
        $scope.showDetails = false;
        $scope.logo = "http://res.cloudinary.com/shingo/image/upload/v1474478583/WebContent/Huntsman-Shingo-Logo.png"

        $scope.toggle = function(navId){
            $mdSidenav(navId)
                .toggle();
        }

        $scope.$on('change logo', function(ev, data){
            $scope.logo = data;
        });

        $scope.$on('toggle details', function(ev, data){
            $scope.showDetails = data.state;
            $scope.ev = data.event;
        });
    }
})();