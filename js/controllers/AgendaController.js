/**
 * Angular Controller for AgendaController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('AgendaController',['$scope', 'agenda', AgendaController]);

    function AgendaController($scope, agenda){
        var vm = this;
        vm.agenda = agenda;
        console.log("Agenda: ", agenda);
    };

})();