/**
 * Angular Directive for venueDetail
 */
(function(){
    'use strict';

    angular.module('interface.venues')
    .directive('venueDetail', function(){
        return {
            restrict: 'EA',
            scope: {
                venue: '=',
                travel: '=',
                hotels: '='
            },
            templateUrl: 'views/venues/venueDetail.tmpl.html',
            controller: 'VenueDetailController'
        }
    });

})();