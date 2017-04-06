/**
 * Angular Controller for RecipientItemController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('RecipientItemController', ['$scope', RecipientItemController]);

    function RecipientItemController($scope){
        var vm = this;
        var reg = new RegExp('\/upload.*\/v');
        var parts = _.split($scope.recipient.Organization__r.Logo__c, reg);
        var photoURL = parts[0] + '/upload/c_scale,w_100/v' + parts[1];
        $scope.photoURL = photoURL;
        if(!$scope.photoURL.includes('http')) $scope.photoURL = '';
    };

})();