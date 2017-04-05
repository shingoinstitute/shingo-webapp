/**
 * Angular Controller for ExhibitorItemController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('ExhibitorItemController', ['$scope', ExhibitorItemController]);

    function ExhibitorItemController($scope){
        var reg = new RegExp('\/upload.*\/v');
        var parts = _.split($scope.exhibitor.Organization__r.Logo__c, reg);
        var photoURL = parts[0] + '/upload/c_scale,w_100/v' + parts[1];
        $scope.photoURL = photoURL;
    };

})();