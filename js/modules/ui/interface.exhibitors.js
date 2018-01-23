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
                controller: function($scope, $state, $timeout, $mdDialog, exhibitors, exhibitorshipInfo){
                    var vm = this;
                    vm.exhibitors = exhibitors;

                    vm.exhibitorship = function(){
                        $mdDialog.show({
                            parent: angular.element(document.body),
                            targetEvent: null,
                            template: 
                            '<md-dialog flex flex-gt-sm="40" aria-label="Exhibitor Information">'+
                            '   <md-toolbar class="md-warn">'+
                            '       <div class="md-toolbar-tools">'+
                            '           <h2>Exhibitor Information</h2>'+
                            '       </div>'+
                            '   </md-toolbar>'+
                            '   <md-dialog-content layout-padding>'+
                            '       <span ng-show="data" ng-bind-html="data"></span>'+
                            '       <span ng-show="!data"><p>For more information please email <a href="mailto:mary.price@usu.edu">mary.price@usu.edu</a></p></span>'+
                            '   </md-dialog-content>'+
                            '   <md-dialog-actions>'+
                            '       <md-button ng-click="closeDialog()" class="md-raised md-primary">Close</md-button>'+
                            '   </md-dialog-actions>'+
                            '</md-dialog>',
                            locals: {
                                data: exhibitorshipInfo
                            },
                            controller: function($scope, $mdDialog, data){
                                $scope.data = data;
                                $scope.closeDialog = function(){
                                    $mdDialog.hide();
                                }
                            }
                        });
                    }

                    if ($state.params.exhibitor)
                        scrollTo($scope, $timeout, 'exhibitorList', $state.params.exhibitor, 50, 600);

                    $scope.$emit('toggle filter', true);
        $scope.$on('$destroy', function() {
            $scope.$emit('toggle filter', false);
        });
                },
                controllerAs: 'vm',
                templateUrl: 'views/exhibitors/exhibitors.html',
                resolve: {
                    exhibitors: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.exhibitors($stateParams.id);
                    }],
                    exhibitorshipInfo: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.get($stateParams.id)
                        .then(function(event){
                            return event.Exhibitor_Information__c;
                        });
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