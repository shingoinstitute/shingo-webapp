(function(){
    'use strict';

    console.log('Loading Event List Controller');
    angular.module('interface')
    .controller('EventListController', ['$scope', '$mdSidenav', '$state', 'events', '_', EventListController]);

    function EventListController($scope, $mdSidenav, $state, events){
        var vm = this;
        var typeFilter = function(arrVal, othVal){
            return arrVal.Event_Type__c == othVal.Event_Type__c;
        }
        vm.events = _.differenceWith(events, [{'Event_Type__c': 'Study Tour'}], typeFilter);
        vm.studyTours = _.differenceWith(events, vm.events, typeFilter);

        vm.minEventDate = undefined;
        vm.events.forEach(function(e){
            var start = new Date(e.Start_Date__c);
            if(!vm.minEventDate || start < vm.minEventDate)
                vm.minEventDate = start;
        });

        vm.events = _.sortBy(vm.events, (o) => { return new Date(o.Start_Date__c) });

        vm.minStudyDate = undefined;
        vm.studyTours.forEach(function(e){
            var start = new Date(e.Start_Date__c);
            if(!vm.minStudyDate || start < vm.minStudyDate)
                vm.minStudyDate = start;
        });

        vm.studyTours = _.sortBy(vm.studyTours,  (o) => { return new Date(o.Start_Date__c)});
        

        vm.events = _.concat(vm.events, vm.studyTours);

        vm.getRows = function(event){
            if(vm.isLarge(event)){
                return 10;
            } else {
                return 3;
            }
        }

        vm.getCols = function(event, isMd = false){
            if(event.Event_Type__c.includes("Study Tour"))
                return 3 + (isMd ? 3 : 0);
            return 6;
        }

        vm.isLarge = function(event){
            return event.Event_Type__c.includes("Conference") && new Date(event.Start_Date__c) <= vm.minEventDate;
        }

        vm.go = function(event){
            if(!vm.isLarge(event)) $state.go('event', {id: event.Id});
        }

        $scope.$emit('toggle filter', false);
    }
})();