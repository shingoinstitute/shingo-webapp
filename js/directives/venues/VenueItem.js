/**
 * Angular Directive for venueItem
 */
(function(){
    'use strict';

    angular.module('interface.venues')
    .directive('venueItem', function(){
        return {
            restrict: 'EA',
            scope: {
                venue: '='
            },
            templateUrl: 'views/venues/venueItem.tmpl.html',
            controller: 'VenueItemController'
        }
    });

})();