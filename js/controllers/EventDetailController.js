(function(){
    'use strict';

    angular.module('interface')
    .controller('EventDetailController', ['$scope', 'event', 'highlightSpeakers', EventDetailController]);

    function EventDetailController($scope, event, highlightSpeakers){
        var vm = this;
        vm.event = event;
        vm.highlightSpeakers = highlightSpeakers;
    }
})();