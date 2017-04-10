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

    angular.module('interface.exhibitors', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

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
                templateUrl: 'views/exhibitors/exhibitors.html',
                resolve: {
                    exhibitors: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.exhibitors($stateParams.id);
                    }]
                }
            }

            $stateProvider.state(eventExhibitorDetailState);
            $stateProvider.state(eventExhibitorsState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.exhibitors')
        .constant('_', _);
})();