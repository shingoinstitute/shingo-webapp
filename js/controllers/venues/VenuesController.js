/**
 * Angular Controller for VenuesController
 */
(function(){
    'use strict';

    angular.module('interface.venues')
    .controller('VenuesController', ['$scope', '$state', 'venues', VenuesController]);

    function VenuesController($scope, $state, venues){
        var vm = this;
        
        vm.venues = venues;
        if(vm.venues && vm.venues.length === 1)
            $state.go('venues.details', {venue: vm.venues[0].Id});


        $scope.$emit('toggle filter', false);
    };

})();