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

    angular.module('interface.agenda', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

            var eventAgendaState = {
                name: 'agenda',
                url: '/events/:id/agenda',
                controller: 'AgendaController',
                controllerAs: 'vm',
                templateUrl: 'views/agenda/agenda.html',
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
                templateUrl: 'views/agenda/agendaDay.tmpl.html',
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
                templateUrl: 'views/sessions/sessions.html',
                resolve: {
                    sessions: ["Events", "$stateParams", function (Events, $stateParams) {
                        return Events.sessions($stateParams.id)
                    }]
                }
            }
            // $stateProvider.state('sessions.details', eventSessionDetailState);
            // $stateProvider.state(eventSessionsState);
            $stateProvider.state('agenda.day.session', eventSessionDetailState);
            $stateProvider.state(eventAgendaDayState);
            $stateProvider.state(eventAgendaState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.agenda')
        .constant('_', _);
})();