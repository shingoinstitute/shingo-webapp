/**
 * Angular Directive for exhibitorDetail
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('exhibitorDetail', function(){
        return {
            restrict: 'EA',
            scope: {
                exhibitor: '='
            },
            templateUrl: 'views/exhibitors/exhibitorDetail.tmpl.html',
            controller: 'ExhibitorDetailController'
        }
    });

})();