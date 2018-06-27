// ts-check

(function () {
    'use strict';
    

    angular.module('interface')
        .component('eventGridItem', {
            bindings: {
                event: '<',
                isLarge: '<'
            },
            templateUrl: 'views/eventGridItem.tmpl.html',
            controller: ['$scope', 'Events', '_', '$state', '$window', function($scope, Events, _, $state, $window) {
                this.go = function() {
                    if (this.event.Content_on_CVENT__c) {
                        $window.location.href = this.event.Registration_Link__c
                    } else {
                        $state.go('event', { id: this.event.Id })
                    }
                }
            }]
        })
})();