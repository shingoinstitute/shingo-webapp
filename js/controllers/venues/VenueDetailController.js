/**
 * Angular Controller for VenueDetailController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('VenueDetailController', ['$scope', '$sce', '_', VenueDetailController]);

    function VenueDetailController($scope, $sce, _){
        if(!$scope.venue.Google_Map_Trusted) $scope.venue.Google_Map_Trusted = $sce.trustAsResourceUrl($scope.venue.API_Google_Map__c);
        $scope.travel = _.filter($scope.travel, 'Publish__c');

        $scope.getRow = function(info){
            return 2;
        }

        $scope.getCol = function(info){
            return 2;
        }

        var colors = ['dark-indigo', 'indigo', 'light-blue', 'cyan', 'blue', 'blue-grey'];

        colors = _.shuffle(colors);

        $scope.travel.forEach(function(element, i) {
            element.background = colors[i % colors.length];
            element.row = (element.Content__c.length > 250 || element.Content__c.includes('<ul>') || element.Content__c.includes('<br><br>') ? 2 : 1 );
        }, this);

        $scope.travel = _.sortBy($scope.travel, ['row']).reverse();

        $scope.travel.forEach(function(element, i) {
            element.background = colors[i % colors.length];
        }, this)
    };

})();