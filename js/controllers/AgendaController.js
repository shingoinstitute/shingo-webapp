/**
 * Angular Controller for AgendaController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('AgendaController',['$scope', '$state', 'agenda', '_', AgendaController]);

    function AgendaController($scope, $state, agenda, _){
        var vm = this;
        vm.agenda = _.sortBy(agenda, 'Agenda_Date__c');
        vm.selected = 0;

        $scope.$watch('vm.selected', function(newVal, oldVal){
            $state.go('agenda.day', {day: vm.agenda[newVal].Id});
        });

        $scope.$emit('toggle filter', true);
    };

})();