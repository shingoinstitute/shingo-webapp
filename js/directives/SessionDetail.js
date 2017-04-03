/**
 * Angular Directive for sessionDetail
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('sessionDetail', function(){
        return {
            restrict: 'EA',
            scope: {
                session: '=',
                eventId: '='
            },
            templateUrl: 'views/sessionDetail.tmpl.html',
            controller: 'SessionDetailController'
        }
    });

})();