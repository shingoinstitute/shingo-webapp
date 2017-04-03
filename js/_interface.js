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
            'duScroll'
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
                                var random = _.sampleSize(_.differenceWith(speakers, [{
                                    'Is_Keynote_Speaker__c': false
                                }], _.isEqual), 5);
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
                    agenda: ["Events", "$stateParams", function (Events, $stateParams) {
                        return Events.agenda($stateParams.id)
                    }]
                }
            }

            var eventAgendaDayState = {
                name: 'agenda.day',
                url: '/:day',
                controller: function ($scope, $state, $timeout, day) {
                    $scope.day = day;
                    if ($state.params.session)
                        scrollTo($scope, $timeout, 'sessionList', $state.params.session, 50, 600);
                },
                templateUrl: 'views/agendaDay.tmpl.html',
                resolve: {
                    day: ['Days', '$stateParams', function (Days, $stateParams) {
                        return Days.get($stateParams.day);
                    }]
                }
            }

            var eventSessionDetailState = {
                url: '/:session',
                controller: function ($scope, $stateParams, session, speakers) {
                    $scope.session = session;
                    $scope.session.Speakers = speakers;
                    $scope.eventId = $stateParams.id;
                },
                template: '<session-detail session="session" event-id="eventId"></session-detail>',
                resolve: {
                    session: ["Sessions", "$stateParams", function (Sessions, $stateParams) {
                        return Sessions.get($stateParams.session);
                    }],
                    speakers: ["Sessions", "$stateParams", function (Sessions, $stateParams) {
                        return Sessions.speakers($stateParams.session);
                    }]
                }
            }

            var eventSessionsState = {
                name: 'sessions',
                url: '/events/:id/sessions',
                controller: 'SessionsController',
                controllerAs: 'vm',
                templateUrl: 'views/sessions.html',
                resolve: {
                    sessions: ["Events", "$stateParams", function (Events, $stateParams) {
                        return Events.sessions($stateParams.id)
                    }]
                }
            }

            var eventSpeakersState = {
                name: 'speakers',
                url: '/events/:id/speakers',
                controller: 'SpeakersController',
                controllerAs: 'vm',
                templateUrl: 'views/speakers.html'
            }

            var eventSpeakersTypeState = {
                name: 'speakers.type',
                url: '/:type',
                controller: function ($scope, $state, $timeout, speakers) {
                    $scope.speakers = speakers;
                    if ($state.params.speaker)
                        scrollTo($scope, $timeout, 'speakerList', $state.params.speaker, 50, 600);
                },
                templateUrl: 'views/speakersType.tmpl.html',
                resolve: {
                    speakers: ["Events", "$stateParams", "$q", "_", function (Events, $stateParams, $q, _) {
                        return Events.speakers($stateParams.id)
                            .then(function (speakers) {
                                var isKeynote = function (obj, comp) {
                                    var is = (obj.Session_Speaker_Associations__r !== null) == comp.Is_Keynote;
                                    // console.log('is keynote', is);
                                    return is;
                                }

                                speakers = _.differenceWith(speakers, [{
                                    "Is_Keynote": !($stateParams.type == 'keynote')
                                }], isKeynote);
                                return $q.resolve(speakers);
                            });
                    }]
                }
            }

            var eventSpeakerDetailState = {
                name: 'speakers.type.details',
                url: '/:speaker',
                controller: function ($scope, speaker) {
                    $scope.speaker = speaker;
                },
                template: '<speaker-detail person="speaker"></speaker-detail>',
                resolve: {
                    speaker: ["Speakers", "$stateParams", function (Speakers, $stateParams) {
                        return Speakers.get($stateParams.speaker);
                    }]
                }
            }

            var eventExhibitorDetailState = {
                url: '/:exhibitor',
                name: 'exhibitors.details',
                controller: function($scope, exhibitor){
                    $scope.exhibitor = exhibitor;
                },
                template: '<exhibitor-detail exhibitor="exhibitor"></exhibitor-detail>',
                resolve: {
                    exhibitor: ["Exhibitors", "$stateParams", function(Exhibitors, $stateParams){
                        return Exhibitors.get($stateParams.exhibitor);
                    }]
                }
            }

            var eventExhibitorsState = {
                name: 'exhibitors',
                url: '/events/:id/exhibitors',
                controller: function($scope, $state, $timeout, exhibitors){
                    var vm = this;
                    vm.exhibitors = exhibitors;

                    if ($state.params.exhibitor)
                        scrollTo($scope, $timeout, 'exhibitorList', $state.params.exhibitor, 50, 600);

                    $scope.$emit('toggle filter', true);
                },
                controllerAs: 'vm',
                templateUrl: 'views/exhibitors.html',
                resolve: {
                    exhibitors: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.exhibitors($stateParams.id);
                    }]
                }
            }

            $stateProvider.state(eventExhibitorDetailState);
            $stateProvider.state(eventExhibitorsState);
            $stateProvider.state(eventSpeakerDetailState);
            $stateProvider.state(eventSpeakersTypeState);
            $stateProvider.state(eventSpeakersState);
            // $stateProvider.state('sessions.details', eventSessionDetailState);
            // $stateProvider.state(eventSessionsState);
            $stateProvider.state('agenda.day.session', eventSessionDetailState);
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
                    $rootScope.$broadcast('change logo', 'http://res.cloudinary.com/shingo/image/upload/v1474478583/WebContent/Huntsman-Shingo-Logo.png')
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