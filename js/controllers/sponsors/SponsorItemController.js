/**
 * Angular Controller for SponsorItemController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('SponsorItemController', ['$scope', SponsorItemController]);

    function SponsorItemController($scope){
        var reg = new RegExp('\/upload.*\/v');
        var parts = _.split($scope.sponsor.Organization__r.Logo__c, reg);
        var photoURL = parts[0] + '/upload/c_scale,w_100/v' + parts[1];
        $scope.photoURL = photoURL;
    };

})();