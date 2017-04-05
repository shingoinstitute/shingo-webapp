/**
 * Angular Directive for sponsorItem
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('sponsorItem', function(){
        return {
            restrict: 'EA',
            scope: {
                sponsor: '='
            },
            templateUrl: 'views/sponsors/sponsorItem.tmpl.html',
            controller: 'SponsorItemController'
        }
    });

})();