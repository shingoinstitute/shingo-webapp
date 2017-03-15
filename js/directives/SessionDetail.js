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
                session: '='
            },
            templateUrl: 'views/sessionDetail.tmpl.html',
            controller: 'SessionDetailController'
        }
    });

})();