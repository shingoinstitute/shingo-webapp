(function () {
    'use strict';

    angular.module('interface', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial' // Angular Material
        ])
        .config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
            
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey', {
                    'default': '500'
                })
                .accentPalette('grey', {
                    'default': '600'
                });

            var eventListState = {
                name: 'eventList',
                url: '/',
                controller: 'EventListController',
                controllerAs: 'vm',
                templateUrl: 'views/eventList.html',
                resolve: {
                    events: ["Events", function(Events){
                        return Events.listUpcoming();
                    }]
                }
            }

            var eventDetailState = {
                name: 'event',
                url: '/:id',
                templateUrl: 'views/eventDetail.html',
                resolve: {
                    event: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.get($stateParams.id);
                    }]
                }
            }

            $stateProvider.state(eventListState);
            $stateProvider.state(eventDetailState);

            $urlRouterProvider.otherwise('/');
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