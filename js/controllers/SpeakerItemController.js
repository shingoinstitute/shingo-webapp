/**
 * Angular Controller for SpeakerItemController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('SpeakerItemController', ['$scope', '_', SpeakerItemController]);

    function SpeakerItemController($scope, _){
        var reg = new RegExp('\/upload.*\/v');
        var parts = _.split($scope.person.Picture_URL__c, reg);
        var photoURL = parts[0] + '/upload/c_thumb,g_face,h_100,w_100/v' + parts[1];
        $scope.photoURL = photoURL
    };

})();