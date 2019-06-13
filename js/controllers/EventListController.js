(function(){
    'use strict';

    angular.module('interface')
    .controller('EventListController', ['$scope', '$mdSidenav', '$state', 'events', '_', EventListController]);

    function EventListController($scope, $mdSidenav, $state, events){
        var vm = this;
        var typeFilter = function(arrVal, othVal){
            return arrVal.Event_Type__c == othVal.Event_Type__c;
        }
        vm.events = _.differenceWith(events, [{'Event_Type__c': 'Study Tour'},{'Event_Type__c': 'Showcase'}], typeFilter);
        vm.studyTours = _.differenceWith(events, [{'Event_Type__c': 'Summit'},{'Event_Type__c': 'Showcase'},{'Event_Type__c': 'Conference'}], typeFilter);
        vm.showCases = _.differenceWith(events, [{'Event_Type__c': 'Study Tour'},{'Event_Type__c': 'Summit'},{'Event_Type__c': 'Conference'}], typeFilter);

        vm.minEventDate = undefined;
        vm.events.forEach(function(e){
            var start = new Date(e.Start_Date__c);
            if(!vm.minEventDate || start < vm.minEventDate)
                vm.minEventDate = start;
        });

        vm.events = _.sortBy(vm.events, function(o) { return new Date(o.Start_Date__c) });

        vm.minStudyDate = undefined;
        vm.studyTours.forEach(function(e){
            var start = new Date(e.Start_Date__c);
            if(!vm.minStudyDate || start < vm.minStudyDate)
                vm.minStudyDate = start;
        });

        vm.studyTours = _.sortBy(vm.studyTours,  function(o) { return new Date(o.Start_Date__c)});
        

        //vm.events = _.concat(vm.events, vm.studyTours);

        vm.getRows = function(event){
            if(vm.isLarge(event)){
                return 10;
            } else {
                return 3;
            }
        }

        vm.getCols = function(event, isMd){
            /*if(event.Event_Type__c.includes("Study Tour"))
                return 3 + (isMd ? 3 : 0);*/
            return 3 + (isMd ? 3 : 0);
        }

        vm.isLarge = function(event){
            //return event.Event_Type__c.includes("Conference") && new Date(event.Start_Date__c) <= vm.minEventDate;
            return false;
        }

        vm.go = function(event){
            $state.go('event', {id: event.Id});
        }

    }
})();