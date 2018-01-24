(function(){
    'use strict';

    angular.module('interface')
    .controller('EventDetailController', ['$scope', '$sce', 'event', 'highlightSpeakers', EventDetailController]);

    function EventDetailController($scope, $sce, event, highlightSpeakers){
        var vm = this;
        vm.event = event;
        if(!vm.event.Video_Trusted) vm.event.Video_Trusted = $sce.trustAsResourceUrl(vm.event.Video__c);
        vm.highlightSpeakers = highlightSpeakers;

        vm.event.Shingo_Prices__r.records.sort(function(a,b){ 
            if(a.Order__c == undefined) a.Order__c = 1000;
            if(b.Order__c == undefined) b.Order__c = 1000;
            return a.Order__c - b.Order__c
        });

    }
})();