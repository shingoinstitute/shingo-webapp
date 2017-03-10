(function () {
    'use strict';

    angular.module('interface', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize' // Display HTML from objects
        ])
        .config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {

            var shingoRedMap = $mdThemingProvider.extendPalette('red', {
                '500': '#640921'
            });
            var shingoBlueMap = $mdThemingProvider.extendPalette('blue', {
                '500': '#003768'
            })

            var shingoGoldMap = $mdThemingProvider.extendPalette('amber', {
                '500': '#b17c31'
            })

            $mdThemingProvider.definePalette('shingoBlue', shingoBlueMap);
            $mdThemingProvider.definePalette('shingoRed', shingoRedMap);
            $mdThemingProvider.definePalette('shingoGold', shingoGoldMap);
            $mdThemingProvider.theme('default')
                .primaryPalette('shingoRed', {
                    'default': '500'
                })
                .accentPalette('shingoBlue', {
                    'default': '500'
                })
                .warnPalette('shingoGold', {
                    'default': '500'
                });

            var eventListState = {
                name: 'eventList',
                url: '/events',
                controller: 'EventListController',
                controllerAs: 'vm',
                templateUrl: 'views/eventList.html',
                resolve: {
                    events: ["Events", function (Events) {
                        return Events.listUpcoming();
                    }]
                }
            }

            var eventDetailState = {
                name: 'event',
                url: '/events/:id',
                controller: 'EventDetailController',
                controllerAs: 'vm',
                templateUrl: 'views/eventDetail.html',
                resolve: {
                    event: ["Events", "$stateParams", function (Events, $stateParams) {
                        return Events.get($stateParams.id);
                    }],
                    highlightSpeakers: ["Speakers", "$stateParams", "$q", function(Speakers, $stateParams, $q){
                        return Speakers.list($stateParams.id)
                        .then(function(speakers){
                            var random = _.sampleSize(_.differenceWith(speakers, [{'Is_Keynote_Speaker__c': false}], _.isEqual), 5);
                            console.debug('Got random speakers', random);
                            return $q.resolve(random);
                        });
                    }]
                }
            }

            $stateProvider.state(eventListState);
            $stateProvider.state(eventDetailState);

            $urlRouterProvider.otherwise('/events');
        });

    // Add state to $rootScope
    // Listen for Access error (via $stateChangeError)
    // Go to proper state or log if you don't know what to do
    angular.module('interface')
        .run(['$rootScope', '$state', function ($rootScope, $state) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.error("$stateChangeError");
                console.error("ERROR: ", error);
            });
        }]);

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface')
        .constant('_', _);
})();