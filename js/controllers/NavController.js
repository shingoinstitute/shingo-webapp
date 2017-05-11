(function(){
    'use strict';

    angular.module('interface')
    .controller('NavController', ['$scope', '$state', '$mdSidenav', NavController]);

    function NavController($scope, $state, $mdSidenav){
        $scope.states = [{'name': 'eventList', 'title': 'Upcoming Events'}, {'name': 'pastEventList', 'title': 'Past Events'}];
        $scope.showDetails = false;
        $scope.logo = "https://res.cloudinary.com/shingo/image/upload/v1474478583/WebContent/Huntsman-Shingo-Logo.png"

        $scope.isActiveMenuItem = function(ev, item){
            return ev && ev.App_Menu_Items__c && ev.App_Menu_Items__c.includes(item);
        }

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