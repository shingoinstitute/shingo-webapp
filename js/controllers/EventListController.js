(function(){
    'use strict';

    console.log('Loading Event List Controller');
    angular.module('interface')
    .controller('EventListController', ['$scope', '$mdSidenav', 'events', EventListController]);

    function EventListController($scope, $mdSidenav, events){
        var vm = this;
        vm.events = events;

        vm.getRows = function(event){
            if(event.Event_Type__c.includes("Conference")){
                return 6;
            } else {
                return 3;
            }
        }

        vm.getCols = function(event){
            return 6;
        }

        vm.toggle = function(id){
            $mdSidenav(id).toggle();
        }
    }
})();