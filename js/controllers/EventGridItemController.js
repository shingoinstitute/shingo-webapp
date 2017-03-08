(function(){
    'use strict';

    angular.module('interface')
    .controller('EventGridItemController', ['$scope', 'Events', '_', EventGridItemController]);

    function EventGridItemController($scope, Events, _){
        Events.get($scope.event.Id)
        .then(function(event){
            $scope.event = event;
        })
        .catch(function(err){
            console.error("ERROR: ", err);
        });

        $scope.displayExtra = function(){
            return $scope.event.Event_Type__c.includes("Conference");
        }
    }
})();