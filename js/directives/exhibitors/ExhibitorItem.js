/**
 * Angular Directive for exhibitorItem
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('exhibitorItem', function(){
        return {
            restrict: 'EA',
            scope: {
                exhibitor: '='
            },
            templateUrl: 'views/exhibitors/exhibitorItem.tmpl.html',
            controller: 'ExhibitorItemController'
        }
    });

})();