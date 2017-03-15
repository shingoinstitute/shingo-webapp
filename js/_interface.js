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
                    highlightSpeakers: ["Events", "$stateParams", "$q", function(Events, $stateParams, $q){
                        return Events.speakers($stateParams.id)
                        .then(function(speakers){
                            var random = _.sampleSize(_.differenceWith(speakers, [{'Is_Keynote_Speaker__c': false}], _.isEqual), 5);
                            console.debug('Got random speakers', random);
                            return $q.resolve(random);
                        });
                    }]
                }
            }

            var eventAgendaState = {
                name: 'agenda',
                url: '/events/:id/agenda',
                controller: 'AgendaController',
                controllerAs: 'vm',
                templateUrl: 'views/agenda.html',
                resolve: {
                    agenda: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.agenda($stateParams.id)
                    }]
                }
            }

            var eventAgendaDayState = {
                name: 'agenda.day',
                url: '/:day',
                parent: eventAgendaState,
                controller: function($scope, day){ $scope.day = day; },
                templateUrl: 'views/agendaDay.tmpl.html',
                resolve: {
                    day: ['Days', '$stateParams', function(Days, $stateParams){
                        return Days.get($stateParams.day);
                    }]
                }
            }

            var eventAgendaSessionState = {
                name: 'agenda.day.session',
                url: '/:session',
                parent: eventAgendaDayState,
                controller: function($scope, session, speakers){ $scope.session = session; $scope.session.Speakers = speakers; },
                template: '<session-detail session="session"></session-detail>',
                resolve: {
                    session: ["Sessions", "$stateParams", function(Sessions, $stateParams){
                        return Sessions.get($stateParams.session);
                    }],
                    speakers: ["Sessions", "$stateParams", function(Sessions, $stateParams){
                        return Sessions.speakers($stateParams.session);
                    }]
                }
            }

            $stateProvider.state(eventAgendaSessionState);
            $stateProvider.state(eventAgendaDayState);
            $stateProvider.state(eventAgendaState);
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
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if(toState.name == 'eventList') {
                    $rootScope.$broadcast('change logo', 'http://res.cloudinary.com/shingo/image/upload/v1474478583/WebContent/Huntsman-Shingo-Logo.png')
                    $rootScope.$broadcast('toggle details', {state: false, event: {}});
                } else {
                    Events.get(toParams.id)
                    .then(function(ev){
                        $rootScope.$broadcast('change logo', ev.Logo__c);
                        var data = {};
                        data.state = true;
                        data.event = ev;
                        $rootScope.$broadcast('toggle details', data);
                    })
                    .catch(function(err){
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