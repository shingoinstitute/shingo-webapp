/**
 * Angular Controller for AgendaController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('AgendaController',['$scope', '$state', '$location', 'agenda', '_', AgendaController]);

    function AgendaController($scope, $state, $location, agenda, _){
        var vm = this;
        vm.agenda = _.sortBy(agenda, 'Agenda_Date__c');

        $scope.$on('$stateChangeSuccess', function(ev, toState, toParams, fromState, fromParams){
            console.debug("toState", toState);
            console.debug("toParams", toParams);
            console.debug("fromState", fromState);
            console.debug("fromParams", fromParams);
            
            var path = $location.path().split('agenda/');
            if(path.length == 2) path = path[1].split('/')[0];
            else path = vm.agenda[0].Id;
            
            vm.currentNavItem = _.findIndex(vm.agenda,['Id', path]);
            if(toState.url == '/events/:id/agenda') $state.go('agenda.day', {day: vm.agenda[vm.currentNavItem].Id});
        })
        
        $scope.$watch('vm.currentNavItem', function(newVal, oldVal){
            if(newVal != oldVal) $state.go('agenda.day', {day: vm.agenda[newVal].Id});
        });

        vm.onSwipeRight = function(){
            vm.currentNavItem = vm.currentNavItem - 1;
            if(vm.currentNavItem === -1) vm.currentNavItem = vm.agenda.length - 1;
        }

        vm.onSwipeLeft = function(){
            vm.currentNavItem = (vm.currentNavItem + 1) % vm.agenda.length;
        }

        $scope.$emit('toggle filter', true);
        $scope.$on('$destroy', function() {
            $scope.$emit('toggle filter', false);
        });
    };

})();