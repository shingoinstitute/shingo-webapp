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

    angular.module('interface.speakers', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

            var eventSpeakersState = {
                name: 'speakers',
                url: '/events/:id/speakers',
                controller: 'SpeakersController',
                controllerAs: 'vm',
                templateUrl: 'views/speakers/speakers.html'
            }

            var eventSpeakersTypeState = {
                name: 'speakers.type',
                url: '/:type',
                controller: function ($scope, $state, $timeout, speakers) {
                    $scope.speakers = speakers;
                    if ($state.params.speaker)
                        scrollTo($scope, $timeout, 'speakerList', $state.params.speaker, 50, 600);
                },
                templateUrl: 'views/speakers/speakersType.tmpl.html',
                resolve: {
                    speakers: ["Events", "$stateParams", "$q", "_", function (Events, $stateParams, $q, _) {
                        return Events.speakers($stateParams.id)
                            .then(function (speakers) {
                                var isKeynote = function (obj, comp) {
                                    var is = (obj.Session_Speaker_Associations__r !== null) == comp.Is_Keynote;
                                    return is;
                                }

                                speakers = _.differenceWith(speakers, [{
                                    "Is_Keynote": !($stateParams.type == 'keynote')
                                }], isKeynote);
                                speakers = _.sortBy(speakers, ['Contact__r.LastName', 'Name']);
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

            $stateProvider.state(eventSpeakerDetailState);
            $stateProvider.state(eventSpeakersTypeState);
            $stateProvider.state(eventSpeakersState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.speakers')
        .constant('_', _);
})();