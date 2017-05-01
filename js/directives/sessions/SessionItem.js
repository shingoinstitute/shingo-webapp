/**
 * Angular Directive for sessionItem
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('sessionItem', function(){
        return {
            restrict: 'EA',
            scope: {
                session: '='
            },
            templateUrl: 'views/sessions/sessionItem.tmpl.html',
            controller: 'SessionItemController'
        }
    });

})();