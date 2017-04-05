/**
 * Angular Directive for sponsorDetail
 */
(function(){
    'use strict';

    angular.module('interface')
    .directive('sponsorDetail', function(){
        return {
            restrict: 'EA',
            scope: {
                sponsor: '='
            },
            templateUrl: 'views/sponsors/sponsorDetail.tmpl.html',
            controller: 'SponsorDetailController'
        }
    });

})();