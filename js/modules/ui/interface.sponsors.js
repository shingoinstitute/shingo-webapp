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

    angular.module('interface.sponsors', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

            var eventSponsorDetailState = {
                url: '/:sponsor',
                name: 'sponsors.details',
                controller: function($scope, sponsor){
                    $scope.sponsor = sponsor;
                },
                template: '<sponsor-detail sponsor="sponsor"></sponsor-detail>',
                resolve: {
                    sponsor: ["Sponsors", "$stateParams", function(Sponsors, $stateParams){
                        return Sponsors.get($stateParams.sponsor);
                    }]
                }
            }

            var eventSponsorsState = {
                name: 'sponsors',
                url: '/events/:id/sponsors',
                controller: function($scope, $state, $timeout, sponsors){
                    var vm = this;
                    vm.sponsors = {};
                    vm.sponsors['President'] = _.filter(sponsors, {'Sponsor_Level__c': 'President'});
                    vm.sponsors['Champion'] = _.filter(sponsors, {'Sponsor_Level__c': 'Champion'});
                    vm.sponsors['Benefactor'] = _.filter(sponsors, {'Sponsor_Level__c': 'Benefactor'});
                    vm.sponsors['Friend'] = _.filter(sponsors, {'Sponsor_Level__c': 'Friend'});
                    vm.sponsors['Other'] = _.filter(sponsors, {'Sponsor_Level__c': 'Other'});

                    if($state.params.sponsor)
                        scrollTo($scope, $timeout, 'sponsorList', $state.params.sponsor, 50, 600);

                    $scope.$emit('toggle filter', true);
                },
                controllerAs: 'vm',
                templateUrl: 'views/sponsors/sponsors.html',
                resolve: {
                    sponsors: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.sponsors($stateParams.id);
                    }]
                }
            }

            $stateProvider.state(eventSponsorDetailState);
            $stateProvider.state(eventSponsorsState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.sponsors')
        .constant('_', _);
})();