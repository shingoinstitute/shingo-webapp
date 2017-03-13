(function () {
    'use strict';

    angular.module('interface')
        .controller('EventGridItemController', ['$scope', 'Events', 'Speakers', '_', EventGridItemController]);

    function EventGridItemController($scope, Events, Speakers, _) {
        Events.get($scope.event.Id)
            .then(function (event) {
                $scope.event = event;
            })
            .catch(function (err) {
                console.error("ERROR: ", err);
            });

        // Speakers.list($scope.event.Id)
        //     .then(function (speakers) {
        //         var random = _.sampleSize(_.differenceWith(speakers, [{
        //             'Is_Keynote_Speaker__c': false
        //         }], _.isEqual), 2);
        //         console.debug('Got random speakers', random);
        //         $scope.highlightList = random;
        //     })
        //     .catch(function(err){
        //         console.error("ERROR: ", err);
        //     });

    }
})();