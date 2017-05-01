/**
 * Angular Controller for SessionDetailController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('SessionDetailController', ['$scope', SessionDetailController]);

    function SessionDetailController($scope){
        $scope.isKeynote = function(obj){
            return obj.Session_Speaker_Associations__r !== null;
        }
    };

})();