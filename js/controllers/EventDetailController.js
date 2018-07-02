//@ts-check
(function(){
    'use strict';
    const AUTOPLAY_VIDEO = true

    angular.module('interface')
    .controller('EventDetailController', ['$window', '$sce', 'event', 'highlightSpeakers', EventDetailController]);

    function EventDetailController($window, $sce, event, highlightSpeakers){
        var vm = this;
        vm.event = event;
        if (vm.event.Content_on_CVENT__c) {
            $window.location.href = vm.event.Registration_Link__c
        }
        if (vm.event.Video__c) {
            const videoURL = new URL(vm.event.Video__c)
            if (!videoURL.searchParams.has('autoplay') && AUTOPLAY_VIDEO) {
                videoURL.searchParams.set('autoplay', '1')
                videoURL.searchParams.set('mute', '1')
            }
            vm.event.Video_Trusted = $sce.trustAsResourceUrl(videoURL.toString())
        }
        vm.highlightSpeakers = highlightSpeakers;

        vm.event.Shingo_Prices__r.records.sort(function(a,b){ 
            if(a.Order__c == undefined) a.Order__c = 1000;
            if(b.Order__c == undefined) b.Order__c = 1000;
            return a.Order__c - b.Order__c
        });

    }
})();