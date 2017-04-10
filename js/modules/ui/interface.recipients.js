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

    angular.module('interface.recipients', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

            var eventRecipientsState = {
                name: 'recipients',
                url: '/events/:id/recipients',
                controller: 'RecipientsController',
                controllerAs: 'vm',
                templateUrl: 'views/recipients/recipients.html'
            }

            var eventRecipientsTypeState = {
                name: 'recipients.type',
                url: '/:type',
                controller: function($scope, $state, $timeout, recipients){
                    $scope.recipients = recipients;
                    if($state.params.recipient)
                        scrollTo($scope, $timeout, 'recipientList', $state.params.recipient, 50, 600);
                },
                templateUrl: 'views/recipients/recipientsType.tmpl.html',
                resolve: {
                    recipients: ["Events", "$stateParams", "$q", "_", function(Events, $stateParams, $q, _){
                        return Events.recipients($stateParams.id)
                        .then(function(recipients){
                                var types = {
                                    'prize': 'Shingo Prize',
                                    'silver': 'Silver Medallion',
                                    'bronze': 'Bronze Medallion',
                                    'research': 'Research',
                                    'publication': 'Publication'
                                }

                                recipients = _.filter(recipients, {'Award_Type__c': types[$stateParams.type]});
                                return $q.resolve(recipients);
                        })
                    }]
                }
            }

            var eventRecipientDetailState = {
                name: 'recipients.type.details',
                url: '/:recipient',
                controller: function($scope, recipient){
                    $scope.recipient = recipient;
                },
                template: '<recipient-detail recipient="recipient"></recipient-detail>',
                resolve: {
                    recipient: ["Recipients", "$stateParams", function(Recipients, $stateParams){
                        return Recipients.get($stateParams.recipient);
                    }]
                }
            }

            $stateProvider.state(eventRecipientDetailState);
            $stateProvider.state(eventRecipientsTypeState);
            $stateProvider.state(eventRecipientsState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.recipients')
        .constant('_', _);
})();