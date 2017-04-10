/**
 * Angular Controller for RecipientDetailController
 */
(function(){
    'use strict';

    angular.module('interface')
    .controller('RecipientDetailController', ['$scope', RecipientDetailController]);

    function RecipientDetailController($scope){
        var vm = this;
        if($scope.recipient.List_of_Photos__c)
            $scope.recipient.List_of_Photos__c = $scope.recipient.List_of_Photos__c.split(',');
    };

})();