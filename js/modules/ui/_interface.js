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

    angular.module('interface', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll',   // Programmatic scrolling
            'interface.agenda', // Agenda Routes
            'interface.exhibitors', // Exhibitor Routes
            'interface.recipients', // Recipient Routes
            'interface.speakers', // Speaker Routes
            'interface.sponsors', // Sponsor Routes
            'interface.venues', // Venue Routes
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
                    highlightSpeakers: ["Events", "$stateParams", "$q", function (Events, $stateParams, $q) {
                        return Events.speakers($stateParams.id)
                            .then(function (speakers) {
                                var isKeynote = function (obj, comp) {
                                    var is = (obj.Session_Speaker_Associations__r !== null) == comp.Is_Keynote;
                                    return is;
                                }

                                var random = _.differenceWith(speakers, [{
                                    "Is_Keynote": false
                                }], isKeynote);
                                return $q.resolve(_.sampleSize(random, 5));
                            });
                    }]
                }
            }

            $stateProvider.state(eventDetailState);
            $stateProvider.state(eventListState);

            $urlRouterProvider.otherwise('/events');
        });

    // Add state to $rootScope
    // Listen for Access error (via $stateChangeError)
    // Go to proper state or log if you don't know what to do
    angular.module('interface')
        .run(['$rootScope', '$state', 'Events', function ($rootScope, $state, Events) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.error("$stateChangeError");
                console.error("ERROR: ", error);
                console.debug("toState", toState);
                console.debug("toParams", toParams);
                console.debug("fromState", fromState);
                console.debug("fromParams", fromParams);
            });

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                fromState.params = fromParams;
                $state.previous = fromState;
            })

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name == 'eventList') {
                    $rootScope.$broadcast('change logo', 'https://res.cloudinary.com/shingo/image/upload/v1474478583/WebContent/Huntsman-Shingo-Logo.png')
                    $rootScope.$broadcast('toggle details', {
                        state: false,
                        event: {}
                    });
                } else {
                    Events.get(toParams.id)
                        .then(function (ev) {
                            $rootScope.$broadcast('change logo', ev.Logo__c);
                            var data = {};
                            data.state = true;
                            data.event = ev;
                            $rootScope.$broadcast('toggle details', data);
                        })
                        .catch(function (err) {
                            console.error("ERROR: ", err);
                        });
                }

            })
        }]);

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface')
        .constant('_', _);
})();