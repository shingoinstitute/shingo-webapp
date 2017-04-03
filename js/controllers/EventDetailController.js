(function(){
    'use strict';

    angular.module('interface')
    .controller('EventDetailController', ['$scope', '$sce', 'event', 'highlightSpeakers', EventDetailController]);

    function EventDetailController($scope, $sce, event, highlightSpeakers){
        var vm = this;
        vm.event = event;
        vm.event.Video__c = $sce.trustAsResourceUrl(vm.event.Video__c);
        vm.highlightSpeakers = highlightSpeakers;

        $scope.$emit('toggle filter', false);
    }
})();