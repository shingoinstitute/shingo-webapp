(function () {
    'use strict';

    function scrollTo($scope, $timeout, listId, itemId, offset, duration) {
                var list = angular.element(document.getElementById(listId));
                $scope.listItems = document.getElementById(listId).children;
                $scope.$watch('listItems.length', function (newV, oldV) {
                    if (newV != oldV) {
                        $timeout(function () {
                            list.scrollToElementAnimated(document.getElementById(itemId), offset, duration);
                        }, 500);
                    }
                }, true);
            }

    angular.module('interface.venues', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

            var eventVenueDetailState = {
                url: '/:venue',
                name: 'venues.details',
                controller: function($scope, venue, travel, hotels){
                    $scope.venue = venue;
                    $scope.travel = travel;
                    $scope.hotels = hotels;
                },
                template: '<venue-detail venue="venue" travel="travel" hotels="hotels"></venue-detail>',
                resolve: {
                    venue: ["Venues", "$stateParams", function(Venues, $stateParams){
                        return Venues.get($stateParams.venue);
                    }],
                    travel: ["Events", "$stateParams", "$q", function(Events, $stateParams, $q){
                        return Events.get($stateParams.id)
                        .then(function(event){
                            if(event.Shingo_Travel_Infos__r)
                                return $q.resolve(event.Shingo_Travel_Infos__r.records);
                            else
                                return $q.resolve([]);
                        })
                    }],
                    hotels: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.hotels($stateParams.id);
                    }]
                }
            }

            var eventVenuesState = {
                url: '/events/:id/venues',
                name: 'venues',
                controller: 'VenuesController',
                controllerAs: 'vm',
                templateUrl: 'views/venues/venues.html',
                resolve: {
                    venues: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.venues($stateParams.id);
                    }]
                }
            }

            $stateProvider.state(eventVenueDetailState);
            $stateProvider.state(eventVenuesState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.venues')
        .constant('_', _);
})();