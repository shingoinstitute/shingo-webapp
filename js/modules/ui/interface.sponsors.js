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

    angular.module('interface.sponsors', [
            'ui.router', // UI Router Module
            'dataLayer', // Data Layer module
            'ngMaterial', // Angular Material
            'ngSanitize', // Display HTML from objects
            'duScroll'   // Programmatic scrolling
        ])
        .config(function ($stateProvider) {

            var eventSponsorDetailState = {
                url: '/:sponsor',
                name: 'sponsors.details',
                controller: function($scope, sponsor){
                    $scope.sponsor = sponsor;
                },
                template: '<sponsor-detail sponsor="sponsor"></sponsor-detail>',
                resolve: {
                    sponsor: ["Sponsors", "$stateParams", function(Sponsors, $stateParams){
                        return Sponsors.get($stateParams.sponsor);
                    }]
                }
            }

            var eventSponsorsState = {
                name: 'sponsors',
                url: '/events/:id/sponsors',
                controller: function($scope, $state, $timeout, $mdDialog, sponsors, sponsorshipInfo){
                    var vm = this;
                    vm.sponsors = {};
                    vm.sponsors['President'] = _.filter(sponsors, {'Sponsor_Level__c': 'President'});
                    vm.sponsors['Champion'] = _.filter(sponsors, {'Sponsor_Level__c': 'Champion'});
                    vm.sponsors['Benefactor'] = _.filter(sponsors, {'Sponsor_Level__c': 'Benefactor'});
                    vm.sponsors['Friend'] = _.filter(sponsors, {'Sponsor_Level__c': 'Friend'});
                    vm.sponsors['Other'] = _.filter(sponsors, {'Sponsor_Level__c': 'Other'});

                    console.log("sponsor info: ", sponsorshipInfo)

                    vm.sponsorship = function(){
                        $mdDialog.show({
                            parent: angular.element(document.body),
                            targetEvent: null,
                            template: 
                            '<md-dialog flex flex-gt-sm="40" aria-label="Sponsorship Information">'+
                            '   <md-toolbar class="md-warn">'+
                            '       <div class="md-toolbar-tools">'+
                            '           <h2>Sponsorship Information</h2>'+
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
                                data: sponsorshipInfo
                            },
                            controller: function($scope, $mdDialog, data){
                                $scope.data = data;
                                $scope.closeDialog = function(){
                                    $mdDialog.hide();
                                }
                            }
                        });
                    }

                    if($state.params.sponsor)
                        scrollTo($scope, $timeout, 'sponsorList', $state.params.sponsor, 50, 600);

                    $scope.$emit('toggle filter', true);
        $scope.$on('$destroy', function() {
            $scope.$emit('toggle filter', false);
        });
                },
                controllerAs: 'vm',
                templateUrl: 'views/sponsors/sponsors.html',
                resolve: {
                    sponsors: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.sponsors($stateParams.id);
                    }],
                    sponsorshipInfo: ["Events", "$stateParams", function(Events, $stateParams){
                        return Events.get($stateParams.id)
                        .then(function(event){
                            return event.Sponsorship_Information__c;
                        });
                    }]
                }
            }

            $stateProvider.state(eventSponsorDetailState);
            $stateProvider.state(eventSponsorsState);
        });

    // Make lodash.js available
    // throughout the interface module
    angular.module('interface.sponsors')
        .constant('_', _);
})();